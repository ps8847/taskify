const addBtn = document.querySelector("#addbtn"),
    maindata = document.querySelector("#maindata"),
    addBox = document.querySelector(".addbox"),
    Titlevalue = addBox.querySelector("input"),
    Descvalue = addBox.querySelector("textarea")
updtitle = document.querySelector("#updatetitle"),
    upddesc = document.querySelector("#updatedesc");
updbtn = document.querySelector("#updatebtn");


const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "Septem  ber", "October", "November", "December"
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");


let isUpdate = false,
    updateId;


colorclassesnames = ["l-bg-orange-dark", "l-bg-green-dark", "l-bg-blue-dark", "l-bg-cherry"];

function showNotes() {
    let i = 0;
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let classname = colorclassesnames[i];
        if (i >= colorclassesnames.length - 1) {
            i = 0;
        } else {
            i++;
        }
        let liTag = `
        <div class="col-sm-6 mb-4 note">
            <div class="card text-white ${classname} mb-3 card-block">
                <div class="card-body">
                 <h5 class="card-title"> ${note.Title}</h5>
                    <p class="card-text"><i> <q>${note.Descvalue}</q></i></p>
                    <p class="card-text"><b>${note.date}</b></p>

                    <a onclick="noteupdate(${index}, '${note.Title}', '${note.Descvalue}')" data-toggle="modal" data-target="#exampleModal" class="btn btn-primary">Edit</a>
                    <a onclick="deletenote(${index})" class="btn btn-danger">Delete</a>
                    <button onclick="completedtasks(${index})" class="btn btn-success" data-toggle="modal" data-target="#taskcomp" id="${index}">Completed</button>
            </div>
</div>
    </div>`;
        maindata.insertAdjacentHTML("beforeend", liTag);
    });
}


showNotes();


function deletenote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function deletenote2(noteId) {
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));


    showNotes();
}


let clicks = parseInt(localStorage.getItem("countcomp")) || 0;

localStorage.setItem("countcomp", clicks);

console.log(clicks);

function showcompletedtasktotal() {

    if (clicks == 0) {
        var data1 = `<h3 class='alert alert-success fade show mt-3 ml-1 mr-1'>Hey!!, You Haven't Completed any Task yet </h3>`;
    } else {
        var data1 = `<h3 class='alert alert-success fade show mt-3 ml-1 mr-1'>Well Done!! Your Total Completed Tasks are:  ${clicks} </h3>`;
    }
    document.getElementById("resultmodal3").innerHTML = data1;
}

function completedtasks(index) {

    clicks += 1;

    localStorage.setItem("countcomp", clicks);


    window.setTimeout(function() { $("#taskcomp1").modal('hide') }, 3000);

    deletenote2(index);
    showNotes();


}


function noteupdate(noteId, title, desc) {
    updtitle.value = title;
    upddesc.value = desc;

    isUpdate = true;
    updateId = noteId;

    var noteId;
    console.log(noteId, title, desc);


    updbtn.addEventListener("click", e => {

        e.preventDefault();
        let nodetitle = updtitle.value,
            nodedisc = upddesc.value;

        if (nodetitle && nodedisc) {
            let dateobj = new Date(),
                month = months[dateobj.getMonth()],
                day = dateobj.getDate(),
                year = dateobj.getFullYear();

            let noteInfo = {
                id: noteId,
                Title: nodetitle,
                Descvalue: nodedisc,
                date: `${month} ${day} ${year}`
            }
            if (!isUpdate) {
                notes.push(noteInfo);
            } else {
                notes[updateId] = noteInfo;

            }
            localStorage.setItem("notes", JSON.stringify(notes));

            window.setTimeout(function() { $("#exampleModalCenter").modal('hide') }, 2000);
            showNotes();
        }
    })

}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    let nodetitle = Titlevalue.value,
        nodedisc = Descvalue.value;

    if (nodetitle && nodedisc) {
        let dateobj = new Date(),
            month = months[dateobj.getMonth()],
            day = dateobj.getDate(),
            year = dateobj.getFullYear();

        let noteInfo = {
            Title: nodetitle,
            Descvalue: nodedisc,
            date: `${month} ${day} ${year}`
        }


        notes.push(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));
        var data = "<h3 class= 'alert alert-success alert-dismissible fade show' >Task Registered successfully!</h3>";
        document.getElementById("result").innerHTML = data;

        window.setTimeout(function() {
            $(".alert").fadeTo(1000, 0).slideUp(500, function() {
                $(this).remove();
            })
        })
        showNotes();
        Titlevalue.value = "";
        Descvalue.value = "";
    } else {
        var data = "<h3 class= 'alert alert-danger alert-dismissible fade show' >Task Not Registered Please Enter both TITLE and DESCRIPTION!</h3>";
        document.getElementById("result").innerHTML = data;

        window.setTimeout(function() {
            $(".alert").fadeTo(5000, 0).slideUp(500, function() {
                $(this).remove();
            })
        })
    }

});
