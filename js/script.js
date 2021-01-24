let checkAll = document.getElementById('checkAll')
let items = document.querySelectorAll('.list__checkbox')
let btnDel = document.getElementById('btnDel')
let btnDelUltimate = document.getElementById('popupYes')
let list = document.querySelectorAll('.list__item')
let content = document.querySelectorAll('.label')

btnDel.disabled = true

for (let item of items){
item.addEventListener('change', function() {
	activeDel()
  notActiveDel()
})
  }

function activeDel() {
    for (let item of items){
      if(item.checked) {
        btnDel.disabled = false
      } 
    }
}

function forAll() {
  if (checkAll.checked) {
    for (let item of items){
      item.checked = true;
    }
}
    if (!checkAll.checked) {
    for (let item of items){
      item.checked = false;
    }
}
}

function notActiveDel() {
  let items = document.querySelectorAll('.list__checkbox');
            let i=0
        for (let item of items){
          if (item.checked && item !== checkAll) {i +=1}
        }
  if (i ==0) {
              btnDel.disabled = true
}
}

let counter = 0
function delItem() {
let items = document.querySelectorAll('.list__checkbox')
        for (let i=0; i < items.length; i++){
          if (items[i].checked && items[i] !== checkAll) {          
items[i].parentNode.parentNode.removeChild(items[i].parentNode)   
            btnDel.disabled = true
            checkAll.checked = false


            let newData = [];
            fetch("http://nicejournal.ru/fg-list/js/data.json", {
              headers: {
                method: "DELETE",
                "Content-Type": "application/json"
              }
            })
              .then((res) => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
              })
              .then((res) => {
                newData = res;
                newData.splice(i, 1);
              });



            counter+= +items[i].id.length
            if (counter > 40) {checkAll.disabled = true}
          }
        }

}

btnDelUltimate.addEventListener('click', function() {
  delItem()
})

//popup
let btnPopup = document.querySelector('.list__button')
let overlay = document.querySelector('.overlay')
let popup = document.querySelector('.popup')
let cross = document.querySelector('.popup__cross')
let popupNo = document.getElementById('popupNo')

btnPopup.addEventListener('click', function() {
      popup.style.display = 'flex'
      overlay.style.display = 'flex'
})

function closePopup(button){
  button.addEventListener('click', function() {
      popup.style.display = 'none'
      overlay.style.display = 'none'
      btnDel.disabled = true
})
}

closePopup(overlay)
closePopup(cross)
closePopup(popupNo)
closePopup(btnDelUltimate)

  function notChecked(button) {
    button.addEventListener('click', function() {
        for (let item of items){
          if (item.checked == true) {
            item.checked = false
          }
        }
})
  }

notChecked(popupNo) 
notChecked(cross) 
notChecked(overlay);

function getList() {
  let newData = [];
  fetch("http://nicejournal.ru/fg-list/js/data.json", {
    headers: {
      method: "GET",
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      newData = res;
      for (let i=0; i<newData.length; i++) {
          content[i].textContent = newData[i]
      }
    });
}
getList()

