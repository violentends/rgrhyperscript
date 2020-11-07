function hypers([...args]) {
  let string = args.join(" ");
  let topString = " \r\n";
  let bottomString = "\r\n";
  for (let i = 0; i < string.length; i++) {
    if (!/[a-zA-Z]/.test(string.charAt(i))) {
      topString += "\t";
      bottomString += "\t";
    } else {
      topString +=
        " :regional_indicator_" + string.charAt(i).toLowerCase() + ": ";
      bottomString += " :RGRhype: ";
    }
  }
  return topString + bottomString;
}

function copyToClipboard(copyText) {
  /* Select the text field */
  let temp = document.createElement('textarea');
  let text = copyText.innerText;
  document.body.append(temp);
   temp.textContent = text;
  temp.select();
  temp.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
  /* Alert the copied text */
  temp.remove();
  alert("Copied to clipboard!");
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
let clipBtn = $("#copyClip");
clipBtn.on("click", (_) => {
  copyToClipboard(output);
});
form.on("submit", (e) => {
  e.preventDefault();
  let string = hypers(getFormValues(e.target));
  output.innerText = string;
  copyToClipboard(output);
});
