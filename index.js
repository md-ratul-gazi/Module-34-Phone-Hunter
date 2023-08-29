// Search Result Button
const searchPhones = (isShowAll) => {
  let searchInputField = document.getElementById("search-input-field");
  let searchInputFieldValue = searchInputField.value;
  // console.log(searchInputFieldValue);
  getData(searchInputFieldValue, isShowAll);
};

// Get data from API
const getData = async (inputValue = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
  );
  const data = await res.json();
  const phoneData = data.data;
  // console.log(phoneData);
  getPhoneData(phoneData, isShowAll);
};

// Access the all phone data one by one
const getPhoneData = (getPhoneData, isShowAll) => {
  const showALL = document.getElementById("show-all");
  if (!isShowAll) {
    getPhoneData = getPhoneData.slice(0, 12);
    showALL.classList.remove("hidden");
  } else {
    showALL.classList.add("hidden");
  }

  // console.log(getPhoneData.length);

  const searchPhones = document.getElementById("search-phones");
  searchPhones.textContent = "";

  const alertDiv = document.getElementById("alert");
  alertDiv.textContent = "";
  if (getPhoneData.length === 0) {
    const p = document.createElement("p");
    p.innerHTML = `
        <p class="text-5xl font-bold text-[#403F3F] text-center">Your input <span class="text-red-500">data</span> is not available</p>
        `;
    alertDiv.appendChild(p);
  }

  getPhoneData.forEach((phone) => {
    console.log(phone);

    // Create a element in searchPhones
    const div = document.createElement("div");
    div.classList = `card bg-[#FFF] shadow-xl p-6 rounded-lg border border-[#CFCFCF]`;
    div.innerHTML = `
        <div class="bg-[#0D6EFD0D] rounded-lg"><img class=" mx-auto my-10" src="${phone.image}" alt="Shoes"/></div>

        <div class="card-body text-center">
            <h2 class="text-[#403F3F] text-2xl font-bold mb-5">${phone.phone_name}</h2>
            <p class="text-[#706F6F] text-lg font-normal mb-2 leading-7 ">There are many variations of passages of available, but the majority have suffered</p>
            <p class="text-[#403F3F] text-2xl font-bold mb-4">$999</P>
            <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}'), show_details_modal_5.showModal()" class="text-[#FFF] bg-[#0D6EFD] rounded-lg text-xl font-semibold px-6 py-2">Show Details</button>
            </div>
        </div>
      `;
    searchPhones.appendChild(div);
  });

  loading(false);
};

// Loading spinner
const loading = (getTrue) => {
  const getLoading = document.getElementById("loading-spinner");
  if (getTrue) {
    getLoading.classList.remove("hidden");
  } else {
    getLoading.classList.add("hidden");
  }
};

// Show All button
const showAll = () => {
  // const test = console.log("Show all button is clicked");
  searchPhones(true);
};

// Show All button
const showDetails = async (getId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${getId}`
  );
  const data = await res.json();
  const detailsPhone = data.data;
  // console.log(detailsPhone);
  showPhoneDetails(detailsPhone);
};

// Show phone details in modal
const showPhoneDetails = (phoneDetails) => {
  console.log(phoneDetails);
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
        <div class="bg-[#0D6EFD0D] rounded-lg"><img class=" mx-auto py-10"
         src="${phoneDetails.image}" alt="${phoneDetails.name}"/></div>

          <div class="card-body">

            <h2 class="text-[#403F3F] text-3xl font-bold mb-5">${phoneDetails.name}</h2>

            <p class="text-[#706F6F] text-base	 font-normal mb-2 leading-7 ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

            <p class="text-[#403F3F] text-xl font-bold mb-4">Storage: <span class ="font-normal text-[#706F6F]">'${phoneDetails.mainFeatures.storage}'</span></P>

            <p class="text-[#403F3F] text-xl font-bold mb-4">DisplaySize: <span class ="font-normal text-[#706F6F]">'${phoneDetails.mainFeatures.displaySize}'</span></P>

            <p class="text-[#403F3F] text-xl font-bold mb-4">ChipSet: <span class ="font-normal">'${phoneDetails.mainFeatures.chipSet}'</span></P>

            <p class="text-[#403F3F] text-xl font-bold mb-4">Memory: <span class ="font-normal text-[#706F6F]">'${phoneDetails.mainFeatures.memory}'</span></P>

            <p class="text-[#403F3F] text-xl font-bold mb-4">Slug: <span class ="font-normal">'${phoneDetails.slug}'</span></P>

            <p class="text-[#403F3F] text-xl font-bold mb-4">ReleaseDate: <span class ="font-normal text-[#706F6F]">'${phoneDetails.releaseDate}'</span></P>

            <p class="text-[#403F3F] text-xl font-bold mb-4">Brand: <span class ="font-normal text-[#706F6F]">'${phoneDetails.brand}'</span></P>

            <p class="text-[#403F3F] text-xl font-bold">GPS: <span class ="font-normal text-[#706F6F]">'${phoneDetails?.others?.GPS ? phoneDetails.others.GPS : "No GPS available in this device"}'</span></P>
            

      `;
};

getData();
