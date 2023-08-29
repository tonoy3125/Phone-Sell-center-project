const loadData = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones)
}
const displayPhones = phones => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    // clear Phone Container cards before adding new cards
    phoneContainer.textContent = '';
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
                        <button class="btn bg-[#0D6EFD] text-white pt-2 pb-2 pl-6 pr-6 text-center">Show Details</button>
                      </div>
                    </div>
        `;

        // appendchild
        phoneContainer.appendChild(phonecard);
    });
}


const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    loadData(searchText);
}

// loadData()