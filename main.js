let listf = document.getElementById('list');
let body = document.getElementById('body');


let a = listf.contentWindow.document.querySelector('.table');
a.style.width = "100%";
let registerid = [];
get_todo_list();

function get_todo_list() {
    if (typeof(Storage) !== "undefined") {
        // Code for localStorage
        if (window.localStorage.getItem('keyid') !== null) {
            let keyarray = JSON.stringify(window.localStorage.getItem('keyid'));
            let newkeys = JSON.parse(keyarray).split(",");
            newkeys.forEach((item, index) => {
                let eachkey = window.localStorage.getItem(item.toString());
                let newarr = new Array();
                newarr.push(JSON.parse(eachkey))
                create_todo_list(newarr);
            })
        } else {
            console.log("Storage empyth");
        }
    } else {
        console.log("browser doesnt support");
    }

}



function create_todo_list(lists) {
    let maintable = listf.contentWindow.document.querySelector('.table');

    let i = 0;
    lists.forEach(function(list) {

        var maintr = document.createElement('tr');
        maintr.classList.add("tablerow");
        maintr.id = list['id'].toString();
        var maintd = document.createElement('td');
        var mainsectd = document.createElement('td');
        mainsectd.id = list['id'].toString();
        var mainh4 = document.createElement('h4');
        mainh4.id = list['id'].toString();
        var mainspan = document.createElement('span');
        mainspan.id = list['id'].toString();
        //styling
        mainh4.style.marginBottom = "5px";
        mainspan.style.fontSize = "10px";
        mainspan.style.lineHeight = 2;
        //setting title
        mainh4.textContent = list['name'];
        mainspan.textContent = list['date'];

        mainsectd.append(mainh4, mainspan);
        maintr.append(maintd, mainsectd);
        maintable.append(maintr);
        listclick(maintr);
    });

};

function listclick(eachdiv) {

    eachdiv.addEventListener('click', (e) => {
        console.log("target id " + e.target.id);
        let mainbody = body.contentWindow.document.querySelector('.main-content-body');
        let maintitle = body.contentWindow.document.querySelector('.main-body-title');
        let maindate = body.contentWindow.document.querySelector('.main-body-date');
        let keyarray = JSON.parse(window.localStorage.getItem(e.target.id.toString()));

        maintitle.textContent = keyarray['name'];
        mainbody.textContent = keyarray['content'];
        maindate.textContent = keyarray['date'];

        //Setbody
    })

}


function savetodo() {
    var formtitle = document.getElementById('formtitle');
    var formdate = document.getElementById('formdate');
    var formpriority = document.getElementById('formpriority');
    var formtext = document.getElementById('formtext');

    let i = Math.floor(Math.random() * 100) + 1;
    let todolist = {
        'id': i,
        'name': formtitle.value,
        'date': formdate.value,
        'content': formtext.value
    }


    if (typeof(Storage) !== "undefined") {
        // Code for localStorage

        if (window.localStorage.getItem('keyid') !== null) {
            let keyarray = JSON.stringify(window.localStorage.getItem('keyid'));
            // let newarray = keyarray.replace("]", '');
            console.log("keyarray " + keyarray);
            let search = keyarray.search(",");

            if (search < 0) {
                console.log("search length " + search);
                let newkeys = new Array();
                newkeys.push(JSON.parse(keyarray));
                newkeys.push(i);
                window.localStorage.setItem('keyid', newkeys);
                window.localStorage.setItem(todolist['id'], JSON.stringify(todolist));
            } else {
                console.log("commar exist");
                let newkeys = JSON.parse(keyarray).split(",");
                newkeys.push(i);
                window.localStorage.setItem('keyid', newkeys);
                window.localStorage.setItem(todolist['id'], JSON.stringify(todolist));
            }

        } else {
            registerid.push(i);
            window.localStorage.setItem(todolist['id'], JSON.stringify(todolist));
            window.localStorage.setItem('keyid', JSON.parse(registerid));

            //JSON.parse(registerid)
        }

    } else {
        // No web storage Support.
    }
}