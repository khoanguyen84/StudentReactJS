const filePath = "./student-data.json";
const manager = "manager";
const search = "search";
var students = [];
function renderStudent() {
  fetch(filePath)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        students = data;
        let htmls = students.map(function(student){
            return `
                <tr id="tr_${student.id}">
                    <td>${student.id}</td>
                    <td>${student.studentName}</td>
                    <td class="text-center">${student.java}</td>
                    <td class="text-center">${student.fe}</td>
                    <td class="text-center">${student.react}</td>
                    <td class="text-center">
                        <i class="fa fa-edit" id="edit_${student.id}" onclick="getStudent(${student.id})"></i>
                        <i class="fa fa-check text-success d-none" id="update_${student.id}" onclick="updateStudent(${student.id})"></i>
                        <i class="fa fa-times text-danger" onclick="removeStudent(${student.id})"></i>
                    </td>
                </tr>
            `;
        })
        document.querySelector('.table>tbody').innerHTML = htmls.join("");
    });
}

function removeStudent(studentId){
    let confirmed = window.confirm("Are you sure to remove this student?");
    if(confirmed){
        document.querySelector(`#tr_${studentId}`).remove();
    }
}

function getStudent(studentId){
    let student = students.find(function(std){
        return std.id == studentId;
    })

    document.querySelector(`#edit_${studentId}`).classList.add('d-none');
    document.querySelector(`#update_${studentId}`).classList.remove('d-none');

    let tds = document.querySelector(`#tr_${studentId}`).children;
    tds[1].innerHTML = `<input id="studentName_${studentId}" type='text' class='form-control input-sm' value='${student.studentName}'>`;
    tds[2].innerHTML = `<input id="java_${studentId}" type='number' class='form-control input-sm' value='${student.java}'>`;
    tds[3].innerHTML = `<input id="fe_${studentId}" type='number' class='form-control input-sm' value='${student.fe}'>`;
    tds[4].innerHTML = `<input id="react_${studentId}" type='number' class='form-control input-sm' value='${student.react}'>`;
}

function updateStudent(studentId){
    let newStudentName = document.querySelector(`#studentName_${studentId}`).value;
    let newJava = document.querySelector(`#java_${studentId}`).value;
    let newFe = document.querySelector(`#fe_${studentId}`).value;
    let newReact = document.querySelector(`#react_${studentId}`).value;

    let student = students.find(function(std){
        return std.id == studentId;
    })

    student.studentName = newStudentName;
    student.java = newJava;
    student.fe = newFe;
    student.react = newReact;

    
    let tds = document.querySelector(`#tr_${studentId}`).children;
    tds[1].innerHTML = newStudentName;
    tds[2].innerHTML = newJava;
    tds[3].innerHTML = newFe;
    tds[4].innerHTML = newReact;

    document.querySelector(`#edit_${studentId}`).classList.remove('d-none');
    document.querySelector(`#update_${studentId}`).classList.add('d-none');
}

function changePage(page){
    switch(page){
        case manager:{
            document.querySelector("#manager").classList.remove('d-none');
            document.querySelector("#search").classList.add('d-none');
            document.querySelector('a[href="#manager"]').classList.add('menu-active');
            document.querySelector('a[href="#search"]').classList.remove('menu-active');
            break;
        }
        case search:{
            document.querySelector("#search").classList.remove('d-none');
            document.querySelector("#manager").classList.add('d-none');
            document.querySelector('a[href="#manager"]').classList.remove('menu-active');
            document.querySelector('a[href="#search"]').classList.add('menu-active');
            break;
        }
    }
}
//IIFE
(function(){
    renderStudent();
})()
