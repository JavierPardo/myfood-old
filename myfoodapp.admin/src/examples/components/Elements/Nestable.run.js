import $ from "jquery";
// Nestable
import "nestable/jquery.nestable.js";

export default () => {
  if (!$.fn.nestable) return;

  var updateOutput = function (e) {
    var list = e.length ? e : $(e.target),
      output = list.data("output");

    if (!output) return;

    if (window.JSON) {
      output.val(window.JSON.stringify(list.nestable("serialize"))); //, null, 2));
    } else {
      output.val("JSON browser support required for this demo.");
    }
  };

  // activate Nestable for list 1
  $("#nestable")
    .nestable({
      group: 1,
    })
    .on("change", updateOutput);

  // activate Nestable for list 2
  $("#nestable2")
    .nestable({
      group: 1,
    })
    .on("change", updateOutput);

  // output initial serialised data
  updateOutput($("#nestable").data("output", $("#nestable-output")));
  updateOutput($("#nestable2").data("output", $("#nestable2-output")));

  $(".js-nestable-action").on("click", function (e) {
    var target = $(e.target),
      action = target.data("action");
    if (action === "expand-all") {
      $(".dd").nestable("expandAll");
    }
    if (action === "collapse-all") {
      $(".dd").nestable("collapseAll");
    }
  });
};
