let jsonForm_schema = {
  "schema": {
    "user": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "idSrc": { "type": "string", "enum": ["random", "coockie", "URL", "user"] },
        "background": { "type": "string" },
        "occupation": { "type": "string", "enum": ["Academic", "Industry", "Student"] },
      },
    },
    "puzzleMode": { "type": "string" },
    "metamodel": {
      "type": "object",
      "properties": {
	"freeText": { "type": "string" },
	"diagrams": {
	  "type": "array",
	  "items": { "type": "string" }
	},
      },
    },
    "model": {
      "type": "object",
      "properties": {
        "freeText": { "type": "string" },
        "plantUML": { "type": "string" },
      },
    },
    "verification": { "type": "string" },
    "feedback": { "type": "string" },
      "timing": {
	  "type": "object",
	  "properties": {
	      "form": {
		  "type": "object",
		  "properties": {
		      "start": { "type": "string" },
		      "end": { "type": "string" },
		  },
	      },
	  },
    },
  }
}

let jsonForm_form = {
  "form": [
      { "key": "timing.form.start",
        "readonly": true,
        "type": "hidden"
      },
      { "key": "timing.form.end",
        "readonly": true,
        "type": "hidden"
      },
    { "type": "fieldset",
      "title": "Identification",
      "expandable": true,
      "htmlClass": "expanded",
      "items": [
        { "key": "user.id",
          //"title": "Respondent identifier:",
	  "notitle": true, "prepend": "Respondent identifier: ",
        },
        { "key": "user.idSrc",
          "readonly": true,
          "type": "hidden"
        },
      ],
    },
    { "type": "fieldset",
      "title": "Context",
      "expandable": true,
      "htmlClass": "expanded",
      "items": [
        { "key": "puzzleMode",
          "readonly": true,
	  "type": "hidden"
        },
      ],
    },
    { "type": "fieldset",
      "title": "Meta-Modeling",
      "expandable": true,
      "htmlClass": "expanded",
      "items": [
        { "type": "help",
          "notitle": true,
          "helpvalue": "You can answer using the free text area and multiple <a href='http://plantuml.com'>PlantUML</a> diagrams."
        },
        { "key": "metamodel.freeText",
          "legend": "Free text",
          "type": "textarea",
          "title": "Free text area",
	},
	{ "type": "tabarray",
	  "items": [ {
	      "type": "section",
	      "legend": "Diag. {{idx}}",
	      "items": [
		  { "key": "metamodel.diagrams[]",
		    "type": "textarea",
                    "title": `
                      <span class="help-block">
                    (Unfocus from, i.e. click outside of, the textarea to regenerate the diagram after changing its content. Depending on the security settings of your browser, the diagram update may not work. In that case, you can build the diagram using the <a href='http://plantuml.com/plantuml'>PlantUML website</a> and copy/paste the text source of the diagram in the textarea.)<br/>
                    (Click on the [+] button below to add a diagram, and on the [-] button below to DELETE the SELECTED TAB)
                      </span>
                      <a href='http://plantuml.com'>PlantUML</a> description of the diagram<br/>
                      `,
		    "value": `
note "This is an example" as N1
class Class1
class "Another class" as c2
Class1 <|-- "1..*" c2
"Yet another" *-- Class4 : rel. name
c2 "1" --> "0..1" Class4
N1 .. Class1`,
		    "append": `
                      <span>
                        <!-- <label>Generated diagram</label> -->
                        <div class="center">
                          <img id="metamodel.diagrams[{{idx}}-1].diag" class="center metamodel-diagram"/>
                        </div>
                        <script>
			  var imgDOM = $("img[id='metamodel.diagrams[{{idx}}-1].diag']");
			  var code = imgDOM.closest("span.input-group-addon").prev("textarea").val();
			  generatePlantUML(code, imgDOM);
                        </script>
                      </span>
                      `,
		    onChange: function (evt) {
			var code = $(evt.target).val();
			var imgDOM = $(evt.target).next("span").find("img.metamodel-diagram");
			generatePlantUML(code, imgDOM);
		    }
		  } ]
	  } ]
	},
      ],
    },
    { "type": "fieldset",
      "title": "Modeling",
      "expandable": true,
      "htmlClass": "expanded",
      "items": [
        { "type": "help",
          "notitle": true,
          "helpvalue": "Choose if you want to answer using free text or <a href='http://plantuml.com'>PlantUML</a>."
        },
        { "type": "selectfieldset",
          "title": "Choose answer type: &nbsp;&nbsp;",
	  // "prepend": "Choose answer type:",
          // "description": "Choose if you want to answer using free text or PlantUML",
          "items": [
            { "key": "model.plantUML",
              "legend": "PlantUML",
              "type": "textarea",
              "title": `
                <a href='http://plantuml.com'>PlantUML</a> description of the model<br/>
                <span class="help-block">(Unfocus, i.e. click outside, to regenerate the diagram)</span>`,
	      // "description": "Unfocus to regenerate the diagram",
	      "value": `
note "This is an example" as N1
object "An object" as o1
object "Another object" as o2
object "Yet another" as YetAnother
o1 --> o2 : Rel
o1 --> YetAnother : Rel
N1 .. o1`,
	      "append": `
                    <span>
                      <!-- <label>Generated diagram</label> -->
                      <div class="center">
                        <img id="model.plantUML.diag" class="center"/>
                      </div>
                    </span>
                  `,
	      onLoad: function (evt) {
		  var code = $(evt.target).val();
		  generatePlantUML(code, $("img[id='model.plantUML.diag']"));
	      },
	      onChange: function (evt) {
		  var code = $(evt.target).val();
		  generatePlantUML(code, $("img[id='model.plantUML.diag']"));
	      }
	    },
            { "key": "model.freeText",
              "legend": "Free text",
              "type": "textarea",
              "title": "Free text description of the model",
              // "description": "Model the example described above."
	    },
          ],
        },
      ],
    },
    { "type": "fieldset",
      "title": "Verification",
      "expandable": true,
      "htmlClass": "expanded",
      "items": [
        { "type": "help",
          "notitle": true,
          "helpvalue": "How would you verify the property (Prop)? Potentially, but not necessarily, providing OCL expressions or any other appropriate means."
        },
        { "key": "verification",
          "type": "textarea",
          "title": "Verification mechanism",
          "description": "Describe how the verification mechanism would work (a single OCL expression may be a sufficient answer)."
        }
      ],
    },
    { "type": "fieldset",
      "title": "Additional questions",
      "expandable": true,
      "htmlClass": "expanded",
      "items": [
        { "key": "user.occupation",
          // "title": "Position",
	  "notitle": true, "prepend": "Position: ",
          "description": "Current occupation",
	  "fieldHtmlClass": "inline", // Does not work. Can't access the controls div
        },
        { "key": "user.background",
          "type": "textarea",
          "title": "Meta-modeling/modeling Background",
          "description": "Education background: modeling/meta-modeling courses taken during “initial” studies, “professional” studies, self-taught, ..."
        },
      ],
    },
    { "type": "fieldset",
      "title": "Comment on the questionnaire",
      "expandable": true,
      // "htmlClass": "expanded",
      "items": [
        { "type": "help",
          "notitle": true,
          "helpvalue": "If you have any feedback to provide to improve the questionnaire, please provide it in the following box."
        },
        { "key": "feedback",
          "type": "textarea",
          "title": "Feedback",
          // "description": ""
        }
      ],
    },
    { "type": "submit",
      "title": "Submit"
    }
  ]
}

/// HELPER FUNCTIONS: COOCKIES
// Retrieved from https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
////////////////////////////////////////////////////////////////////////////////

$('form').jsonForm(Object.assign(jsonForm_schema, jsonForm_form));

// Correcting generated display
$("fieldset.expanded > div").css({ display: "block" });
$("select.nav").parent().addClass("inline");
$("select.nav").parent().prev().addClass("inline");
//$("select[name='user.occupation']").parent().addClass("inline");
//$("select[name='user.occupation']").parent().prev().addClass("inline");

// Adding introduction
const container = $("div[class='container']")
container.prepend(`
		  <p>The aim of this quiz is to collect data to validate or invalidate a meta-modeling hypothesis (not related to right or wrong).</p>
    <p>The goal is to design a meta-model (or more generally a "modeling architecture") that could be used as the basis to implement a tool for communication and validation of the containment relationship of (shipping) packets exchanged in a company having a tree-shaped organizational structure.</p>
`);

// Adding additional text
// Identification text
const identificationSct = $("legend:contains('Identification')").next("div");
if ( identificationSct.length ) {
  identificationSct.prepend(`
    <p>In order to allow for multiple answers (and relate those), an identifier is randomly selected and stored in a cookie. You can change this value if you wish. If cookies are disabled on your browser (or if you use different browsers), please always fill this field with the same value of your choice.</p>
  `);
}
// Context text
const contextStc = $("legend:contains('Context')").next("div");
if ( contextStc.length ) {
  contextStc.prepend(`
    <p>Companies of interest are structured in a tree-shaped hierarchical way. For example, the world headquarter (HQ) overlooks the regional HQ, each one of them overlooking country-level HQ, each one of them overlooking ... This tree shaped hierarchical structure of HQ is of arbitrary width and depth, but not infinite or intractable (data size is not the problem of interest here).</p>
		     <p>Internal deliveries inside those companies are handled by recursive handling of nested packets or packages. A package is addressed to a specific HQ. A package is composed of: <em>items</em>; and <em>(sub-)packages</em>. At reception of a package P, a HQ is supposed to:
 <em>if it is not the addressee of the packet</em>, forward P to the addressee HQ;
 or, <em>if it is the addressee</em>, then open the package, keep the items, and iterate on the sub-packages (forward packages addressed to other HQ, and open sub-packages addressed to itself).
 <em>It is common for a package to contain sub-packages addressed to the same HQ.</em></p>
		     <p id='last-context-paragraph'>Inside every HQ, a <em>packaging unit</em> is in charge of packaging; while a <em>logistic management unit</em> is in charge of overlooking the delivery process. For every package created, the packaging unit sends a document to the logistics management unit that describes the containment structure and destinations of the package and sub-packages. The document does not contain any information about items (they are not the concern of the information exchange). The document describes the tree-shape structure of the package and its sub-packages, and it identifies the destination (a HQ) of the top-level package and every (sub-)packages.</p>
  `);
}
// Meta-modeling text
const metamodelingSct = $("legend:contains('Meta-Modeling')").next("div");
if ( metamodelingSct.length ) {
  metamodelingSct.prepend(`
    <p>We want to replace this document-based transfer of information between the packaging and logistics management units, by a model-based transfer of information (instead of the packaging unit sending a textual document to the logistics management unit, the packaging unit sends a model to the logistics management unit) that would be compatible for any company having a similar tree-shaped structure and using similar internal delivery system of nested packages.</p>
    <p>How would you design the support of this model-based transfer of information (meta-model or something else + any other elements/information needed to use it)?</p>
  `);
}
// Supposedly handled by the onLoad event declared in the json form description
// // Adding diagram for model.plantUML
// const metamodelPlantumlTA = $("textarea[name='metamodel.diagrams[0]']");
// if ( metamodelPlantumlTA.length ) {
//     var code = metamodelPlantumlTA[0].value;
//     generatePlantUML(code, $("img.metamodel-diagram:eq(0)"));
// }
// Modeling text
const modelingSct = $("legend:contains('Modeling')").filter("legend:not(:contains('Meta'))").next("div");
if ( modelingSct.length ) {
  modelingSct.prepend(`
    <p>Provide the associated model for:
      <ul>
		      <li>A company composed of a top-level HQ (Universe HQ) and a few sub-HQ (Europe HQ, Moon HQ, Mare Cognitum HQ). The Universe HQ, based on Earth, directly overlooks the Europe and Moon HQ; while the Moon HQ directly overlooks the Mare Cognitum HQ</li>
      <li>A top-level package P1 composed of 2 sub-packages (P11 and P12).</li>
      <li>P1 and P11 are addressed to the Moon HQ, and P12 is addressed to the Mare Cognitum HQ.</li>
      </ul>
    </p>
  `); }
// Adding diagram for model.plantUML
// Supposedly handled by the onLoad event declared in the json form description but does not work
const modelPlantumlTA = $("textarea[name='model.plantUML']");
if ( modelPlantumlTA.length ) {
	// Added as an append field in the form
  // modelPlantumlTA.after(`
  //   <span>
  //     <label>Generated diagram</label>
  //     <div class="center">
  //       <img id="model.plantUML.diag" class="center"/>
  //     </div>
  //   </span>
  // `);
    var code = modelPlantumlTA[0].value;
    generatePlantUML(code, $("img[id='model.plantUML.diag']"));
}
// Verification text
var puzzleMode=getCookie("puzzleMode");
if (puzzleMode == "") {
  if ( Math.random() < 0.5 ) {
    puzzleMode = "before";
  } else {
    puzzleMode = "after";
  }
    
}
setCookie("puzzleMode", puzzleMode, 30);
$("input[name='puzzleMode']")[0].value = puzzleMode;
const verificationIntro = "\
  <p>The logistics management unit wants to automatically verify a property (Prop) stating that every sub-package (SP) of a package (P) is addressed to: the same HQ as its parent package; or a descendant HQ of its parent package (P) destination. Meaning that SP is addressed to a HQ that is the same as P’s destination (HQ_p) or that is below HQ_p in the hierarchical structure.</p>\
  <p>Respecting this property is not an obligation for the packaging unit. But if a package does not respect it, this choice should be verified and discussed between the packaging unit and the logistics management unit.</p>\
";
if ( puzzleMode == "before" ) {
  const lastContextPar = $("p#last-context-paragraph");
  if ( lastContextPar.length ) { lastContextPar.after(verificationIntro); }
} else {
  const verificationSct = $("legend:contains('Verification')").next("div");
  if ( verificationSct.length ) { verificationSct.prepend(verificationIntro); }
}

// Setting up timing.start value
$("input[name='timing.form.start']")[0].value = Math.floor(Date.now() / 1000);
$("form[name='quiz']")[0].addEventListener(
  "submit",
  function() {
      $("input[name='timing.form.end']")[0].value = Math.floor(Date.now() / 1000);
  },
    false);

// Setting up identification values
// id handling logic

var idValue=getCookie("formUserId");
$("input[name='user.idSrc']")[0].value = "coockie";
// window.alert("Coockie returned: "+idValue);
if (idValue == "" || idValue == "undefined") {
    // // Not in coockie, trying to retrieve it from the URL
    // var queryDict = {};
    // location.search.substr(1).split("&").forEach(
    // 	function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]}
    // );
    // idValue = queryDict['user.id'];
    // // window.alert("URL returned: "+idValue);
    // $("input[name='user.idSrc']")[0].value = "URL";
    // if (idValue == "" || idValue == "undefined") {
	// Not in coockie or URL, generating a new one
	// var uuid = require("uuid"); idValue = uuid.v4();
	idValue = (Math.random() + 1).toString(36).substring(2, 15);
	$("input[name='user.idSrc']")[0].value = "random";
    // }
}
setCookie("formUserId", idValue, 30);
$("input[name='user.id']")[0].value = idValue;
$("input[name='user.id']")[0].addEventListener(
  "change",
  function() {
    $("input[name='user.idSrc']")[0].value = "user";
    var userId = $("input[name='user.id']")[0].value
    setCookie("formUserId", userId, 30);
  },
  false)

//
function generatePlantUML(code, imgDOM) {
    var encodedSrc = encode64(deflate(unescape(encodeURIComponent(code))));
    if (encodedSrc != 'AyrBIKtBp4jD0G00') {
        // alert(code + "\n" + encodedSrc);
        imgDOM.attr('src',"http://www.plantuml.com/plantuml/png/"+encodedSrc);
    }
}


// eval: (setq-default indent-tabs-mode nil)
// eval: (setq tab-width 2)
// eval: (setq-local javascript-indent-level 2)
// eval: (setq js-indent-level 2)
// eval: (setq js2-basic-offset 2)
