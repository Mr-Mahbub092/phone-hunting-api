const phoneLoader = async (searchedItem=13, isShowAll) => {
  const res = await fetch(
    `
    https://openapi.programming-hero.com/api/phones?search=${searchedItem}
    `
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(data);
  displayPhones(phones, isShowAll);
};


const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const cardContainer = document.getElementById("phones-container");
  // Remove previous search items after another operation
  cardContainer.textContent ='';

  // Display Show all button if search item is more than 12
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
  }else{
    showAllContainer.classList.add('hidden');
  }

  if(!isShowAll){
     // To display first  12 phones if not show all
    phones = phones.slice(0, 12);
  }

 

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList = "card max-w-xs bg-gray-100 shadow-xl pt-4";
    div.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}'); my_modal_5.showModal()" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    `;
    // console.log(phone);
    cardContainer.appendChild(div);
  });
  // hide spinner
  toggleSpinner(false)

};


// Search Handler
const handleSearch = (isShowAll) =>{
  // display Spinner
  toggleSpinner(true);

  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText)
  phoneLoader(searchText, isShowAll);
}

// Toggle Loader / spinner
const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById('load-spinner');
  if(isLoading){
    spinner.classList.remove('hidden');
  }else(
    spinner.classList.add('hidden')
  )
}


// Show All Handler
const  handleShowAll = () => {
  handleSearch(true);
}

// handle show detailes
const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;
  displayPhoneDetails(phone);
}



// Show phone Details
const displayPhoneDetails = (details) => {
  const detailsContainer= document.getElementById('show-details-container');
  detailsContainer.innerHTML = `
   <div class="bg-gray-200 py-5 flex justify-center">
    <img src="${details.image}"></img>
    </div>
    <h2 class="text-2xl">${details?.name}</h2>
    <p><span class="font-bold"> Storage:</span>${details?.mainFeatures?.storage}</p>
    <p><span class="font-bold"> Display Size</span>${details?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold"> Chipset:</span>${details?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold"> Memory</span>${details?.mainFeatures?.memory}</p>
    <p><span class="font-bold"> Slug:</span>${details?.slug}</p>
    <p><span class="font-bold"> Release Date:</span>${details?.releaseDate}</p>
    <p><span class="font-bold"> Brand: </span>${details?.brand}</p>
    <p><span class="font-bold"> GPS: </span>${details?.others?.GPS}</p>
   
  `

  console.log(details);
} 