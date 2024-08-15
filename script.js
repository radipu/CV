$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Software Engineer", ".NET Developer", "Full Stack Web, Mobile and Desktop App Developer", "Author", "Designer", "Freelancer", "Techie"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    var typed = new Typed(".typing-2", {
        strings: ["opportunities", "possibilities", "new"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            }
            ,
            600:{
                items: 2,
                nav: false
            },
            // 1000:{
            //     items: 3,
            //     nav: false
            // },
            // 600:{
            //     items: 2,
            //     nav: false
            // },
            // 1000:{
            //     items: 3,
            //     nav: false
            // }
        }
    });
});

//pagination

// function getPageList(totalPages, page, maxLength){
//   function range(start, end){
//     return Array.from(Array(end - start + 1), (_, i) => i + start);
//   }

//   var sideWidth = maxLength < 9 ? 1 : 2;
//   var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
//   var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

//   if(totalPages <= maxLength){
//     return range(1, totalPages);
//   }

//   if(page <= maxLength - sideWidth - 1 - rightWidth){
//     return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
//   }

//   if(page >= totalPages - sideWidth - 1 - rightWidth){
//     return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
//   }

//   return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
// }

// $(function(){
//   var numberOfItems = $(".portfolios .portfolio-item").length;
//   var limitPerPage = 6;
//   var totalPages =  Math.ceil(numberOfItems / limitPerPage);
//   var paginationSize = 7;
//   var currentPage;

//   function showPage(whichPage){
//     if(numberOfItems <= 6){
//       $(".pagination").hide
//     }
//     if(whichPage < 1 || whichPage > totalPages) return false;

//     currentPage = whichPage;

//     $(".portfolios .portfolio-item").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

//     $(".pagination li").slice(1, -1).remove();

//     getPageList(totalPages, currentPage, paginationSize).forEach(item => {
//       $("<li>").addClass("page-item").addClass(item ? "current-page" : "dots")
//       .toggleClass("active", item === currentPage).append($("<a>").addClass("page-link")
//       .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page");
//     });

//     $(".previous-page").toggleClass("disable", currentPage === 1);
//     $(".next-page").toggleClass("disable", currentPage === totalPages);
//     return true;
//   }

//   $(".pagination").append(
//     $("<li>").addClass("page-item").addClass("previous-page").append($("<a>").addClass("page-link").text("Prev")),
//     $("<li>").addClass("page-item").addClass("next-page").append($("<a>").addClass("page-link").text("Next"))
//   );

//   $(".portfolios").show();
//   showPage(1);

//   $(document).on("click", ".pagination li.current-page:not(.active)", function(){
//     return showPage(+$(this).text());
//   });

//   $(".previous-page").on("click", function(){
//     return showPage(currentPage - 1);
//   });
//   $(".next-page").on("click", function(){
//     return showPage(currentPage + 1);
//   });
// });

//calculation for my timeline
// Calculate the duration between two dates
function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate === 'present' ? new Date() : new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = (end.getMonth() - start.getMonth()) + 1;

  // Adjust years and months based on day of the month
  if (end.getDate() < start.getDate()) {
    months--;
  }

  // If negative months, adjust years accordingly
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  return { years, months, totalMonths };
}

// Update duration text for each timeline item
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
  const durationElement = item.querySelector('.tl-duration');
  const endDate = index === 0 ? 'present' : durationElement.textContent.split(' - ')[1];
  const { years, months, totalMonths } = calculateDuration(durationElement.textContent.split(' - ')[0], endDate);
  let durationText = '';

  if (totalMonths < 12) {
    durationText += `${totalMonths} month${totalMonths === 1 ? '' : 's'}`;
  } else {
    if (years === 1) {
      durationText += '1 year';
    } else if (years > 1) {
      durationText += `${years} years`;
    }

    if (months > 0) {
      durationText += ` ${months} month${months === 1 ? '' : 's'}`;
    }
  }

  const durationLine = item.querySelector('.tl-line');
  durationLine.insertAdjacentHTML('afterend', `<p class="tl-duration-line">${durationText}</p>`);
});

// Function to calculate the total experience duration
function calculateTotalExperience() {
  let totalYears = 0;
  let totalMonths = 0;

  timelineItems.forEach((item, index) => {
    const durationElement = item.querySelector('.tl-duration');
    const endDate = index === 0 ? 'present' : durationElement.textContent.split(' - ')[1];
    const { years, months } = calculateDuration(durationElement.textContent.split(' - ')[0], endDate);

    totalYears += years;
    totalMonths += months;
  });

  totalYears += Math.floor(totalMonths / 12);
  totalMonths = totalMonths % 12;

  return { totalYears, totalMonths };
}

// Function to format the total experience duration
function formatDuration(totalYears, totalMonths) {
  let durationText = '';

  if (totalYears > 0) {
    durationText += `${totalYears} year${totalYears === 1 ? '' : 's'}`;
  }

  if (totalMonths > 0) {
    if (totalYears > 0) {
      durationText += ', ';
    }

    if (totalMonths === 1) {
      durationText += '1 month';
    } else {
      durationText += `${totalMonths} months`;
    }
  }

  return durationText;
}

// Calculate the total experience duration
const totalExperience = calculateTotalExperience();

// Update the "Overall Experience" text
const overallExperienceText = document.getElementById('overall-experience');
overallExperienceText.textContent = formatDuration(totalExperience.totalYears, totalExperience.totalMonths);

// Update .NET Experience text (optional)
// Function to calculate the ".NET Experience" duration
function calculateDotNetExperience() {
  let totalYears = 0;
  let totalMonths = 0;

  timelineItems.forEach((item, index) => {
    const textContent = item.textContent;
    const dotNetKeywords = [".NET", "C#"];
    
    if (dotNetKeywords.some(keyword => textContent.includes(keyword))) {
      const durationElement = item.querySelector('.tl-duration');
      const endDate = index === 0 ? 'present' : durationElement.textContent.split(' - ')[1];
      const { years, months } = calculateDuration(durationElement.textContent.split(' - ')[0], endDate);

      totalYears += years;
      totalMonths += months;
    }
  });

  totalYears += Math.floor(totalMonths / 12);
  totalMonths = totalMonths % 12;

  return { totalYears, totalMonths };
}

// Function to format the ".NET Experience" duration
function formatDotNetExperience(totalYears, totalMonths) {
  if (totalMonths === 0) {
    return `${totalYears} year${totalYears === 1 ? '' : 's'}`;
  } else if (totalMonths === 1) {
    return `${totalYears} years, 1 month`;
  } else {
    return `${totalYears} years, ${totalMonths} months`;
  }
}

// Function to update the ".NET Experience" text
function updateDotNetExperience() {
  const dotNetExperience = calculateDotNetExperience();
  const dotNetExperienceText = document.getElementById('dotnet-experience');
  dotNetExperienceText.textContent = formatDotNetExperience(dotNetExperience.totalYears, dotNetExperience.totalMonths);
}

// Calculate and update the ".NET Experience" duration
updateDotNetExperience();



//poftfolio classified buttons
// JavaScript code for pagination and filtering
const itemsPerPage = 6; // Number of items to display per page

const filterContainer = document.querySelector(".portfolio-filter");
const filterBtns = filterContainer.querySelectorAll("button");
const portfolioItems = document.querySelectorAll(".portfolio-item");

let currentPage = 1;
let currentCategory = "all";

// Function to display the specified page of items based on the current category
function displayItems(page, category) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  let count = 0;
  portfolioItems.forEach((item) => {
    const itemCategory = item.dataset.category;
    if (category === "all" || itemCategory === category) {
      if (count >= startIndex && count < endIndex) {
        item.classList.add("show");
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
        item.classList.remove("show");
      }
      count++;
    } else {
      item.classList.add("hide");
      item.classList.remove("show");
    }
  });
}

// Function to create pagination buttons based on the number of items and categories
function createPaginationButtons(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  if (totalPages <= 1) {
    return;
  }

  const prevButton = document.createElement("li");
  prevButton.classList.add("page-item", "previous-page", "disable");
  prevButton.innerHTML = '<a class="page-link" href="#"></a>Prev';
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("li");
    pageButton.classList.add("page-item", "current-page");
    pageButton.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    paginationContainer.appendChild(pageButton);

    if (i === currentPage) {
        pageButton.classList.add("active");
    }

    pageButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default anchor click behavior

        if (!this.classList.contains("active")) {
            const activeButton = paginationContainer.querySelector(".current-page.active");
            activeButton.classList.remove("active");
            this.classList.add("active");
            currentPage = i;
            displayItems(currentPage, currentCategory);
        }
    });
}

  const nextButton = document.createElement("li");
  nextButton.classList.add("page-item", "next-page");
  nextButton.innerHTML = '<a class="page-link" href="#">Next</a>';
  paginationContainer.appendChild(nextButton);

  function handleNextButtonClick() {
    const activeButton = paginationContainer.querySelector(".current-page.active");
    if (activeButton.nextSibling && !activeButton.nextSibling.classList.contains("next-page")) {
      activeButton.classList.remove("active");
      activeButton.nextSibling.classList.add("active");
      currentPage++;
      displayItems(currentPage, currentCategory);
    }
  }

  nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    handleNextButtonClick();
  });

  prevButton.addEventListener("click", function () {
    const activeButton = paginationContainer.querySelector(".current-page.active");
    if (activeButton.previousSibling && !activeButton.previousSibling.classList.contains("previous-page")) {
      activeButton.classList.remove("active");
      activeButton.previousSibling.classList.add("active");
      currentPage--;
      displayItems(currentPage, currentCategory);
    }
  });
}

// Function to handle filtering when a filter button is clicked
function handleFilterClick(category) {
    if (currentCategory !== category) {
      currentCategory = category;
      currentPage = 1;
      displayItems(currentPage, currentCategory);
  
      // Add the active class to the clicked button and remove it from others
      filterBtns.forEach((btn) => {
        if (btn.getAttribute("data-filter") === category) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
  
      // Filter the items based on the selected category
      let filteredItems = [];
      portfolioItems.forEach((item) => {
        if (currentCategory === "all" || item.dataset.category === currentCategory) {
          filteredItems.push(item);
        }
      });
  
      // Calculate the total number of pages based on the filtered items
      const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
      createPaginationButtons(totalPages);
    }
  }

// Event listener for filter buttons
filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const category = this.getAttribute("data-filter");
    handleFilterClick(category);
  });
});

// Initial display on page load
displayItems(currentPage, currentCategory);

// Filter the items based on the selected category
let filteredItems = [];
portfolioItems.forEach((item) => {
  if (currentCategory === "all" || item.dataset.category === currentCategory) {
    filteredItems.push(item);
  }
});

// Calculate the total number of pages based on the filtered items
const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

createPaginationButtons(totalPages);
