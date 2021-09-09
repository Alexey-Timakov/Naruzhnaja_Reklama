const sliderOptions = {
    titles: false,
    cropTitlesLenght: 25,
    autoplay: false,
    autoplayInterval: 2000,
    thumbnailsInRow: 8
};

const sampleImagesList = [
    {url: "./src/samples/design/design_01.jpg",
    thumb: "./src/samples/design/thumb_01.jpg",
    title: "Пример дизайна 01"},
    {url: "./src/samples/design/design_02.jpg",
    thumb: "./src/samples/design/thumb_02.jpg",
    title: "Пример дизайна 02"},
    {url: "./src/samples/design/design_03.jpg",
    thumb: "./src/samples/design/thumb_03.jpg",
    title: "Пример дизайна 03"},
    {url: "./src/samples/design/design_04.jpg",
    thumb: "./src/samples/design/thumb_04.jpg",
    title: "Пример дизайна 04"},
    {url: "./src/samples/design/design_05.jpg",
    thumb: "./src/samples/design/thumb_05.jpg",
    title: "Пример дизайна 05"},
    {url: "./src/samples/real/real_00.jpg",
    thumb: "./src/samples/real/thumb_00.jpg",
    title: "Пример дизайна 06"},
    {url: "./src/samples/real/real_01.jpg",
    thumb: "./src/samples/real/thumb_01.jpg",
    title: "Пример дизайна 07"},
    {url: "./src/samples/real/real_02.jpg",
    thumb: "./src/samples/real/thumb_02.jpg",
    title: "Пример дизайна 08"},
    {url: "./src/samples/real/real_03.jpg",
    thumb: "./src/samples/real/thumb_03.jpg",
    title: "Пример дизайна 09"},
    {url: "./src/samples/real/real_06.jpg",
    thumb: "./src/samples/real/thumb_06.jpg",
    title: "Пример дизайна 10"},
    {url: "./src/samples/real/real_07.jpg",
    thumb: "./src/samples/real/thumb_07.jpg",
    title: "Пример дизайна 11"},
    {url: "./src/samples/real/real_08.jpg",
    thumb: "./src/samples/real/thumb_08.jpg",
    title: "Пример дизайна 12"},
    {url: "./src/samples/real/real_09.jpg",
    thumb: "./src/samples/real/thumb_09.jpg",
    title: "Пример дизайна 13"},
    {url: "./src/samples/real/real_10.jpg",
    thumb: "./src/samples/real/thumb_10.jpg",
    title: "Пример дизайна 14"},
    {url: "./src/samples/real/real_11.jpg",
    thumb: "./src/samples/real/thumb_11.jpg",
    title: "Пример дизайна 15"},
    {url: "./src/samples/real/real_12.jpg",
    thumb: "./src/samples/real/thumb_12.jpg",
    title: "Пример дизайна 16"},
    {url: "./src/samples/real/real_13.jpg",
    thumb: "./src/samples/real/thumb_13.jpg",
    title: "Пример дизайна 17"},
    {url: "./src/samples/real/real_14.jpg",
    thumb: "./src/samples/real/thumb_14.jpg",
    title: "Пример дизайна 18"},
    {url: "./src/samples/real/real_15.jpg",
    thumb: "./src/samples/real/thumb_15.jpg",
    title: "Пример дизайна 19"},
];

document.addEventListener("DOMContentLoaded", function() {
    const menu = document.querySelector(".menu__wrapper");
    const sliderImages = document.querySelector(".slider__images");
    const sliderArrows = document.querySelector(".slider__arrows");
    const thumbnails = document.querySelector(".slider__thumbnails");

    const offsetMenu = menu.offsetTop;

    window.onscroll = function() {stickyMenuFunction()}

    initSlider(sliderOptions);

    function stickyMenuFunction() {
        if (window.pageYOffset >= offsetMenu) {
            menu.classList.add("menu__wrapper_sticky");
        } else {
            menu.classList.remove("menu__wrapper_sticky");
        }
    }

    function initSlider(options) {
        if (!sampleImagesList || !sampleImagesList.length) return;
    
        initImages();
        initArrows();
        initThumbnails();
    
        if (options.titles) {
            initTitles();
        }
        if (options.autoplay) {
            initAutoPlay();
        }
    
        function initImages() {
            sampleImagesList.forEach(function(item, index) {
                let imageDiv = `<div class="image n${index} ${index == 0 ? "active":""}"
                style="background-image: url(${sampleImagesList[index].url})"
                data-index="${index}"></div>`;
                sliderImages.innerHTML += imageDiv;
            })
            
        }
        
        function initThumbnails() {
            sampleImagesList.forEach(function(item, index) {
                if (index <= sliderOptions.thumbnailsInRow - 1) {
                    let thumbnailDiv = `<div class="thumbnail n${index} ${index == 0 ? "active":""}"
                    style="background-image: url(${sampleImagesList[index].thumb})"
                    data-index="${index}"></div>`
                    thumbnails.innerHTML +=thumbnailDiv;
                }
            });

            thumbnails.querySelectorAll(".thumbnail").forEach(function(item) {
                addClickEvent(item);
            })
        }

        function initArrows() {
            let arrows = sliderArrows.querySelectorAll(".slider__arrow");
            arrows.forEach(function(item) {
                item.addEventListener("click", function() {
                    let curentImageNumber = +sliderImages.querySelector(".active").dataset.index;
                    let nextImageNumber;
                    if (item.classList.contains("left")) {
                        nextImageNumber = (curentImageNumber === 0) ? sampleImagesList.length - 1 : curentImageNumber - 1;
                        moveThumbnailsLeft(curentImageNumber, nextImageNumber);
                    } else {
                        nextImageNumber = (curentImageNumber === sampleImagesList.length - 1) ? 0 : curentImageNumber + 1;
                        moveThumbnailsRight(curentImageNumber, nextImageNumber);
                    }
                    moveSlider(nextImageNumber);
                })
            })
        }
        
        function initTitles() {
            let titleText;
            if (sampleImagesList[0].title) {
                titleText = cropTitle(sampleImagesList[0].title, sliderOptions.cropTitlesLenght);
            } else {
                titleText = "Без названия";
            }
            let titleDiv = `<div class="slider__images-title">${titleText}</div>`;
            sliderImages.innerHTML += titleDiv;
        }
        
        function changeTitle(number) {
            let sliderTitle = sliderImages.querySelector(".slider__images-title");
            if (!sampleImagesList[number].title) {
                sliderTitle.innerHTML = "Без названия";
            } else {
                sliderTitle.innerHTML = cropTitle(sampleImagesList[number].title, sliderOptions.cropTitlesLenght);
            }
        }
        
        function cropTitle(title, length) {
            if (title.length <= length) {
                return title;
            } else {
                return title.substring(0, length + 1) + "...";
            }
        }
    
        function moveSlider(nextNumber) {
            sliderImages.querySelector(".active").classList.remove("active");
            sliderImages.querySelector(".n" + nextNumber).classList.add("active");
            
            if (sliderOptions.titles) {
                changeTitle(nextNumber);
            }
        }

        function moveThumbnailsRight(curentImageNumber, nextImageNumber) { 
            deActivateThumbnail();            
            if (curentImageNumber == +thumbnails.lastChild.dataset.index) {
                const thumbToRemove = thumbnails.firstChild;
                thumbnails.removeChild(thumbToRemove);
                addNewThumbnail(nextImageNumber, "beforeend");
            } else {
                activateThumbnail(nextImageNumber);
            }
        }
        
        function moveThumbnailsLeft(curentImageNumber, nextImageNumber) {
            deActivateThumbnail();
            if (curentImageNumber == +thumbnails.firstChild.dataset.index) {
                const thumbToRemove = thumbnails.lastChild;
                thumbnails.removeChild(thumbToRemove);
                addNewThumbnail(nextImageNumber, "afterbegin");
            } else {
                activateThumbnail(nextImageNumber);
            }
        }
        
        function activateThumbnail(number) {
            thumbnails.querySelector(".n" + number).classList.add("active");
        }

        function deActivateThumbnail() {
            thumbnails.querySelector(".active").classList.remove("active");
        }

        function addNewThumbnail (number, position) {
            const elementToAdd = `<div class="thumbnail n${number} shown"
                style="background-image: url(${sampleImagesList[number].thumb})"
                data-index="${number}"></div>`;
                thumbnails.insertAdjacentHTML(position, elementToAdd);
                addClickEvent(thumbnails.querySelector(".n" + number));
                activateThumbnail(number);
        }

        function addClickEvent(item) {
            item.addEventListener("click", function() {
                moveSlider(+this.dataset.index);
                deActivateThumbnail();
                activateThumbnail(+this.dataset.index);
            })
        }
        
        function initAutoPlay () {
            intervalId = setInterval(function() {
                let curentImageNumber = +sliderImages.querySelector(".active").dataset.index;
                let nextNumber = (curentImageNumber === sampleImagesList.length - 1) ? 0 : curentImageNumber + 1;
                moveSlider (nextNumber);
            }, sliderOptions.autoplayInterval)
        }        
    }    
})