/* executed for
 /wp-admin/post.php
 /wp-admin/post-new.php
 /wp-admin/term.php
*/
jQuery(window).on("YoastSEO:ready",
function(){
    var $ = jQuery;

	if(!window.YoastSEO.app)
		return;

	var qtx = qTranslateConfig.js.get_qtx();

	//deal with imperfection of QTranslate Slug
	if($('#qts_nonce').length){
		$('#snippet-editor-slug').closest('label').hide();
	}

	//deal with Yoast
	var qreplace_vars = {};
	if(window.wpseoReplaceVarsL10n){

		for(var lang in qTranslateConfig.language_config) {
			qreplace_vars[lang] = {};
		}

		for(var key in  wpseoReplaceVarsL10n.replace_vars){
			var rv = wpseoReplaceVarsL10n.replace_vars[key];
			if(typeof rv === 'string'){
				var rvs = qtranxj_split(rv);
				for(var lang in qTranslateConfig.language_config) {
					qreplace_vars[lang][key] = rvs[lang];
				}
			}else{
				for(var lang in qTranslateConfig.language_config) {
					qreplace_vars[lang][key] = rv;
				}
			}
		}
		wpseoReplaceVarsL10n.replace_vars = qreplace_vars[qTranslateConfig.activeLanguage];
	}

	var removeChildren = function(e){
		while(e.firstChild) {
			e.removeChild(e.firstChild);
		}
	}

//saveSnippetData

	qtx.addLanguageSwitchAfterListener(
		function(lang){

			if(window.wpseoReplaceVarsL10n){
				wpseoReplaceVarsL10n.replace_vars = qreplace_vars[lang];
			}

			var app = YoastSEO.app,
                snippetEditor = YoastSEO.store.getState().snippetEditor;

			var e = document.getElementById(app.config.targets.output);
			if(e)
				removeChildren(e);

			var c = document.getElementById('yoast-seo-content-analysis');
			if(c)
				removeChildren(c);

			// Working part
			// The above code isn't checked.
			app.rawData = app.callbacks.getData();

			// update SEO title field
            snippetEditor.data.title = app.rawData.snippetTitle;
            // update Meta description field
            snippetEditor.data.description = app.rawData.snippetMeta;

			app.refresh();
            // Working part end
		}
	);

});
