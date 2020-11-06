function hypers([...args]) {
  let string = args.join(" ");
  let topString = " \n";
  let bottomString = "\n";
  for (let i = 0; i < string.length; i++) {
    if (!/[a-zA-Z]/.test(string.charAt(i))) {
      topString += "\t";
      bottomString += "\t";
    } else {
      topString += " :regional_indicator_" + string.charAt(i) + ": ";
      bottomString += " :RGRhype: ";
    }
  }
  return topString + bottomString;
}

function copyToClipboard(copyText) {
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}


let $ = document.querySelector.bind(document);
function getFormValues(formEl) {
  return formEl.$$("input").map((el) => el.value);
}
HTMLElement.prototype.$$ = function (sel) {
  return [...this.querySelectorAll(sel)];
};
Node.prototype.on = function (ev, cb) {
  this.addEventListener(ev, cb);
};

let form = $("form");
let output = $("pre");
let clipBtn = $('#copyClip');
clipBtn.on('click', _ => {
   copyToClipboard(output);
})
form.on("submit", (e) => {
  e.preventDefault();
  let string = hypers(getFormValues(e.target));
  output.innerText = string;
});
