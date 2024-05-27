var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var tableContent = document.getElementById("tableContent");
var boxModal = document.getElementById("model");
var closeBtn = document.getElementById("closeBtn");
var bookMarks = [];
if (localStorage.getItem("bookMarksList") != null) {
  bookMarks = JSON.parse(localStorage.getItem("bookMarksList"));
  console.log(bookMarks);
  displayBookMark();
}
/* addBookMark*/
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
/*addBookMark*/
/*displayBookMark*/
function displayBookMark() {
  var newBookMarks = "";
  for (var i = 0; i < bookMarks.length; i++) {
    newBookMarks += `
        <tr>
                <td>${i}</td>
                <td>${bookMarks[i].name}</td>              
                <td>
                  <a  class="btn btn-info" href="${bookMarks[i]
                    .url}" target="_blank">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </a>
                </td>
                <td>
                  <button onclick="deleteBookMark(${i})" class="btn btn-danger pe-2" >
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>

        `;
  }
  tableContent.innerHTML = newBookMarks;
}
var clearBookMark = function() {
  siteName.value = null;
  siteUrl.value = null;
  siteName.classList.remove("is-valid");
  siteUrl.classList.remove("is-valid");
};
/*displayBookMark*/
/*/ delete bookmark*/
var deleteBookMark = function(index) {
  bookMarks.splice(index, 1);
  localStorage.setItem("bookMarksList", JSON.stringify(bookMarks));
  displayBookMark();
};
/* delete bookmark*/
// updated bokkmark */
/* validation*/
function validationInputs(element) {
  // console.log(element);
  var regex = {
    siteName: /^[A-Z][\w ]{2,19}$/,
    siteUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
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
/*validation*/
closeBtn.addEventListener("click", function() {
  boxModal.classList.add("d-none");
});
