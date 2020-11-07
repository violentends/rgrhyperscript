function hypers([...args]) {
  let string = args.join(" ");
  let lens = string.split(/[/\s]/).map((s) => s.length);
  console.log(lens);
  let topString = ":forbidden_space:\r\n";
  let bottomString = "";
  let word = 0;
  let lineLen = lens[word];
  for (let i = 0; i < string.length; i++) {
    if (/[ ]/.test(string.charAt(i))) {
      console.log(lineLen);
      if (lineLen + lens[word + 1] >= 8) {
        topString += "\r\n" + bottomString + "\r\n";
        bottomString = "";
        lineLen = 0;
      } else {
        topString += "\t";
        bottomString += "\t";
      }
      lineLen += lens[word];
      word++;
    } else if (!/[a-zA-Z]/.test(string.charAt(i))) {
      topString += "\t";
      bottomString += "\t";
    } else {
      topString +=
        " :regional_indicator_" + string.charAt(i).toLowerCase() + ": ";
      bottomString += " :RGRhype: ";
    }
  }
  return topString + "\r\n" + bottomString;
}

function copyToClipboard(copyText) {
  /* Select the text field */
  let temp = document.createElement("textarea");
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
