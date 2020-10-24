'use-strict';

// DOWN BUTTON EVENT
(function() {
    const downBtn = document.querySelector(".landing--down-btn")
    const landingContainer = document.querySelector(".landing")

    let landingContainerDimensions = landingContainer.getClientRects()[0]


    window.addEventListener("resize", ()=> landingContainerDimensions = landingContainer.getClientRects()[0])

    function goDown () {
        const vy = landingContainerDimensions.height
        window.scrollTo(0, vy)
    }

    downBtn.addEventListener("click", goDown)

})();
// BURGER BTN EVENT
(function () {
    const burgerBtn = document.querySelector(".burger") 
    const menu = document.querySelector(".menu")
    const classNameSelected = "_selected"

    function toggleState () {
        burgerBtn.classList.toggle("burger" + classNameSelected )
        menu.classList.toggle("menu" + classNameSelected)
    }

    burgerBtn.addEventListener("click", () => {
        toggleState()
    } )
})();
// CAROUSEL
(function() {
    const carouselNavPoint = document.querySelector(".carousel--nav-points")
    const carouselNavPointContainer = carouselNavPoint.parentNode
    const carouselContainer = document.querySelector(".carousel--container")
    const carouselItems = document.querySelectorAll(".carousel--items")

    const userAction = {prev : carouselNavPoint, next : carouselNavPoint, current : 0}

    function moveContainer(itemWidth) {
        carouselContainer.style.transform = `TranslateX(${-userAction.current * itemWidth}px) `
    }

    function manageStyle () {
        const { prev, next } = userAction

        prev.style = ""
        next.style.backgroundColor = "var(--purple-color)"     
    }

    function manageNavPoints ( itemsDim ) {

        carouselNavPointContainer.innerHTML = ""

        for(let i = 0; i < carouselItems.length; i++) {

            const newPoint = carouselNavPoint.cloneNode()

            if(i === userAction.current) userAction.next = newPoint

            newPoint.addEventListener("click", ()=>{
                userAction.prev = userAction.next
                userAction.next = newPoint
                userAction.current = i
                manageStyle()
                moveContainer( itemsDim.width)
            })

            carouselNavPointContainer.appendChild(newPoint)

        }
        manageStyle()
    }

    function init() {
        const carouselItemsDim = carouselItems[0].getClientRects()[0]
        manageNavPoints(carouselItemsDim)
        moveContainer(carouselItemsDim.width)
    }

    window.addEventListener("resize", init)

    init()
})();