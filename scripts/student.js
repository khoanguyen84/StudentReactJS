const filePath = "./student-data.json";
function renderStudent() {
  fetch(filePath)
    .then(function (response) {
      return response.json();
    })
    .then(function (students) {
        let htmls = students.map(function(student){
            return `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.studentName}</td>
                    <td class="text-center">${student.java}</td>
                    <td class="text-center">${student.fe}</td>
                    <td class="text-center">${student.react}</td>
                    <td class="text-center">
                        <i class="fa fa-edit"></i>
                        <i class="fa fa-times text-danger"></i>
                    </td>
                </tr>
            `;
        })
        document.querySelector('.table>tbody').innerHTML = htmls.join("");
    });
}


(function(){
    renderStudent();
})()