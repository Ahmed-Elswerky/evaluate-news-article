// TODO include your scss file here
import "./styles/style.scss";

import { handleForm,$ } from "./js/funcs";


var btn = $("submit-btn");

btn.addEventListener("click", function () {
  handleForm();
});
