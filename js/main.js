var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btnSubmit = document.getElementById("btnSubmit");
var btnUpdated = document.getElementById("btnUpdated");
var tableContent = document.getElementById("tableContent");
var boxModal = document.getElementById("model");
var closeBtn = document.getElementById("closeBtn");
var searchBookMarks = document.querySelector(".searchBookMark");
var bookMarks = [];
var indexBookMark = -1;
if (localStorage.getItem("bookMarksList") != null) {
  bookMarks = JSON.parse(localStorage.getItem("bookMarksList"));
  // console.log(bookMarks);
  displayBookMark();
}
/* start function addBookMark*/
function addBookMark() {
  if (validationInputs(siteName) && validationInputs(siteUrl)) {
    var bookMark = { name: siteName.value, url: siteUrl.value };
    bookMarks.push(bookMark);
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarks));
    console.log(bookMarks);
    clearBookMark();
    displayBookMark();
  } else {
    boxModal.classList.remove("d-none");
  }
}
btnSubmit.addEventListener("click", function() {
  addBookMark();
});
/*end function addBookMark*/
/* start  displayBookMark*/
function displayBookMark() {
  var newBookMarks = "";
  for (var i = 0; i < bookMarks.length; i++) {
    newBookMarks += `
        <tr>
                <td>${i}</td>
                <td>${bookMarks[i].name}</td>              
                <td>
                  <a  class="btn btn-outline-info " href="${bookMarks[i]
                    .url}" target="_blank">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </a>
                </td>
                <td>
                  <button onclick="deleteBookMark(${i})" class="btn btn-outline-danger pe-2" >
                    <i class="fa-solid fa-trash-can"></i>
                    Delete

                </td>
                <td>
                       </button>
                    <button  onclick="setUpdatedBookMark(${i})" class="btn btn-outline-info  pe-2" >
                    <i class="fa-regular fa-pen-to-square"></i>
                    Updated
                  </button>
                  </td>
            </tr>

        `;
  }
  tableContent.innerHTML = newBookMarks;
}
/*end  displayBookMark*/
/* start clear function bookmark */
var clearBookMark = function() {
  siteName.value = null;
  siteUrl.value = null;
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
};
/* start clear function bookmark */
/* start delete bookmark*/
var deleteBookMark = function(index) {
  bookMarks.splice(index, 1);
  localStorage.setItem("bookMarksList", JSON.stringify(bookMarks));
  displayBookMark();
};
/* end delete bookmark*/
/* start Updated BookMark  */
function setUpdatedBookMark(item) {
  indexBookMark = item;
  siteName.value = bookMarks[item].name;
  siteUrl.value = bookMarks[item].url;
  btnSubmit.classList.add("d-none");
  btnUpdated.classList.remove("d-none");
}
btnUpdated.addEventListener("click", function() {
  if (validationInputs(siteName) && validationInputs(siteUrl)) {
    var item = indexBookMark;
    bookMarks[item].name = siteName.value;
    bookMarks[item].url = siteUrl.value;
    localStorage.setItem("bookMarksList", JSON.stringify(bookMarks));
    clearBookMark();
    displayBookMark();
    btnSubmit.classList.remove("d-none");
    btnUpdated.classList.add("d-none");
  } else {
    boxModal.classList.remove("d-none");
  }
});
/* end Updated BookMark  */
/* start search bookMark */
searchBookMarks.addEventListener("keyup", function() {
  searchBookMark(this);
});

function searchBookMark(element) {
  console.log(element);
  // console.log(element.value);
  var result = "";
  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].name.toLowerCase().includes(element.value.toLowerCase())) {
      result += `
        <td>${i}</td>
                <td>${bookMarks[i].name}</td>              
                <td>
                  <a  class="btn btn-outline-info " href="${bookMarks[i]
                    .url}" target="_blank">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </a>
                </td>
                <td>
                  <button onclick="deleteBookMark(${i})" class="btn btn-outline-danger pe-2" >
                    <i class="fa-solid fa-trash-can"></i>
                    Delete

                </td>
                <td>
                       </button>
                    <button onclick="setUpdatedBookMark(${i})" class="btn btn-outline-info  pe-2" >
                    <i class="fa-regular fa-pen-to-square"></i>
                    Updated
                  </button>
                  </td>
            </tr>
      `;
    }
  }
  tableContent.innerHTML = result;
}
/* end  search bookMark*/

/* start validation*/

function validationInputs(element) {
  // console.log(element);
  var regex = {
    siteName: /^[A-Za-z[\w ]{2,19}$/ig,
    siteUrl: /^((http|https):\/\/)?([a-zA-Z0-9-\.]+\.[a-zA-Z]{2,6})(\/?.*)$/
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}
siteName.addEventListener("input", function() {
  validationInputs(this);
});
siteUrl.addEventListener("input", function() {
  validationInputs(this);
});
/*end validation*/
closeBtn.addEventListener("click", function() {
  boxModal.classList.add("d-none");
});
