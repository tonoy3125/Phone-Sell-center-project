const loadData = async (searchText = 'iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones, isShowAll)
}
const displayPhones = (phones, isShowAll) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    // clear Phone Container cards before adding new cards
    phoneContainer.textContent = '';
    // Display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // display only 1st 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        // create a div
        const phonecard = document.createElement('div')
        //Set Classlist
        phonecard.classList = `card bg-white border shadow-xl rounded-lg`
        // Set inner html
        phonecard.innerHTML = `
        <figure class="px-10 pt-10">
                      <img src="${phone.image}" alt="Shoes" class="rounded-xl bg-[#0D6EFD0D]" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h1 class="text-[#403F3F] text-2xl font-bold text-center">${phone.phone_name}</h1>
                      <p class="text-[#706F6F] text-center text-lg font-normal">There are many variations of passages of available, but the majority have suffered</p>
                      <h2 class="text-2xl text-center font-bold">$999</h2>
                      <div class="card-actions">
                        <button onclick = "handleShowDetails('${phone.slug}')" class="btn bg-[#0D6EFD] text-white pt-2 pb-2 pl-6 pr-6 text-center">Show Details</button>
                      </div>
                    </div>
        `;

        // appendchild
        phoneContainer.appendChild(phonecard);
    });

    toggleLoadingSpinner(false);
}


const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // console.log(searchText)
    loadData(searchText, isShowAll);
}
// Toggle Function
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true)
}

// Moral Open
const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const showPhoneDetails = document.getElementById('show-details-container');
    showPhoneDetails.textContent = '';
    const phoneDetails = document.createElement('div')
    phoneDetails.innerHTML = `
    <img class="blok mx-auto mb-3" src="${phone.image}" alt="">
        <h2 class="text-3xl font-semibold">${phone.name}</h2>
        <p class="text-lg my-2 text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold text-black">Storage :</span> ${phone.mainFeatures.storage}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold text-black">Display Size :</span> ${phone.mainFeatures.displaySize}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold text-black">Chipset :</span> ${phone.mainFeatures.chipSet}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold text-black">Memory : </span>${phone.mainFeatures.memory}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold text-black">Slug : </span> ${phone.slug}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold text-black">Release data : </span> ${phone.releaseDate}</p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold text-black">Brand :</span> ${phone.brand} </p>
        <p class="text-xs my-2 text-[#706F6F]"><span class="font-semibold text-black">GPS :</span>${phone.others.GPS} </p>
        <div class="text-center"><button class="btn bg-[#0D6EFD] text-white">Buy Now</button></div>
    `;
    showPhoneDetails.appendChild(phoneDetails)
    show_details_modal.showModal()
}


loadData()