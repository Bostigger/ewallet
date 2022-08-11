// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯

//get current time and date
const totalIncome = calculateTotalIncome()
const totalExpense = calculateTotalExpense()
const balance = totalBalance();
document.querySelector('.income__amount').children[0].innerText= '₵'+totalIncome;
document.querySelector('.expense__amount').children[0].innerText='₵'+totalExpense;
document.querySelector('.balance__amount').children[0].innerText='₵'+balance;
function getFormattedData() {
    const now = new Date().toLocaleTimeString(
        'en-us',{
            month:"short",
            day:"numeric",
            hour:'2-digit',
            minute:'2-digit'
        }
    )
    const dateFormat = now.split(',');
    const swapMonthDay = dateFormat[0].split(' ');
    let day = swapMonthDay[1];
    let month = swapMonthDay[0];
    return `${day} ${month}, ${dateFormat[1]}`;

}


document.querySelector('#ewallet-form').addEventListener('submit',(e)=>{
    e.preventDefault();

    const amount = document.querySelector('.add__value').value;
    const description = document.querySelector('.add__description').value;
    const type = document.querySelector('.add__type').value;
    if(amount.length===0 || description.length===0){
        alert('Amount or Description can not be empty')
    }else {

        document.querySelector('#ewallet-form').reset()
        console.log(amount, description, type)

        addNewItem(type,amount,description)


    }
})

showLocalStorageData();
function showLocalStorageData() {
    const ListCollection = document.querySelector('.collection');
    const items = getItemsFromLs();
    for (let item in items){
        console.log(item)
        const listHtml = `
  <div class="item">
          <div class="item-description-time">
            <div class="item-description">
              <p>${items[item].description}</p>
            </div>
            <div class="item-time">
              <p>${items[item].time}</p>
            </div>
          </div>
          <div class="item-amount ${items[item].type === '+' ? 'income-amount' : 'expense-amount'}">
            <p>${items[item].type}₵${items[item].amount} <span onclick="removeItem(${item})">
              <ion-icon name='remove-circle-outline'></ion-icon>
             </span></p>
           
          </div>
        </div>

`
        ListCollection.insertAdjacentHTML('afterbegin', listHtml);
    }

}

function removeItem(id) {
    let items = localStorage.getItem('items');

    if(items){
        let formatItems = JSON.parse(items)
       formatItems.splice(id,1)
        let newList = JSON.stringify(formatItems);
        localStorage.clear()
        localStorage.setItem('items',newList)
        window.location.reload()
        console.log(newList)

    }

}

function addNewItem(type,amount,description) {

    const time = getFormattedData();

    const listHtml = `
  <div class="item">
          <div class="item-description-time">
            <div class="item-description">
              <p>${description}</p>
            </div>
            <div class="item-time">
              <p>${time}</p>
            </div>
          </div>
          <div class="item-amount ${type === '+' ? 'income-amount' : 'expense-amount'}">
            <p>${type}₵${amount}</p>
          </div>
         
        </div>

`
    const ListCollection = document.querySelector('.collection');
    ListCollection.insertAdjacentHTML('afterbegin', listHtml);

    addItemsToLocalStorage(type,description,amount,time)
    const balance = totalBalance();
    const totalIncome = calculateTotalIncome()
    const totalExpense = calculateTotalExpense()
    console.log(totalIncome)
    document.querySelector('.income__amount').children[0].innerText='₵'+totalIncome;
    document.querySelector('.expense__amount').children[0].innerText='₵'+totalExpense;
    document.querySelector('.balance__amount').children[0].innerText='₵'+balance;

}

function addItemsToLocalStorage(type,desc,amt,time) {
    let items = localStorage.getItem('items');
    if(items){
        items = JSON.parse(items);
    }else{
        items=[];
    }
    items.push({
        type:type,
        description:desc,
        amount:amt,
        time:time
    });
    localStorage.setItem('items',JSON.stringify(items))
}

function getItemsFromLs() {
    let items = localStorage.getItem('items');
    if(items){
        items = JSON.parse(items);
    }else{
        items=[];
    }
    return items;
}

function calculateTotalIncome() {
    const items = getItemsFromLs();
    let totalIncome=0;
    for (let item of items){
       if(item.type==='+'){
           totalIncome = totalIncome + parseInt( item.amount)
       }
    }
    return totalIncome
}
function calculateTotalExpense() {
    const items = getItemsFromLs();
    let totalExpenses=0;
    for (let item of items){
        if(item.type==='-'){
            totalExpenses = totalExpenses + parseInt( item.amount)
        }
    }
    return totalExpenses
}

function totalBalance() {
    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpense();
    return parseInt(totalIncome) - parseInt(totalExpenses)
}

console.log(totalBalance())
function clearList() {
    let items = localStorage.getItem('items');
    if(items){
        localStorage.clear();
        window.location.reload()

    }else{
        alert('Nothing to clear')
    }


}

document.querySelector('.remove__btn').addEventListener('click',(e)=>{
    clearList()


})