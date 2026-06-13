// Draggable windows
function makeDraggable(element) {
    if (!element) return;
  
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;
  
    const header = document.getElementById(element.id + "header");
  
    if (header) {
      header.onmousedown = startDragging;
    } else {
      element.onmousedown = startDragging;
    }
  
    function startDragging(e) {
      e = e || window.event;
      e.preventDefault();
  
      initialX = e.clientX;
      initialY = e.clientY;
  
      document.onmouseup = stopDragging;
      document.onmousemove = drag;
    }
  
    function drag(e) {
      e = e || window.event;
      e.preventDefault();
  
      currentX = initialX - e.clientX;
      currentY = initialY - e.clientY;
  
      initialX = e.clientX;
      initialY = e.clientY;
  
      element.style.top = (element.offsetTop - currentY) + "px";
      element.style.left = (element.offsetLeft - currentX) + "px";
    }
  
    function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  
  // Elements
  const topBar = document.querySelector("#top");
  const welcomeScreen = document.querySelector("#welcome");
  const notesScreen = document.querySelector("#notes");
  
  const welcomeScreenClose = document.querySelector("#welcomeclose");
  const notesScreenClose = document.querySelector("#notesclose");
  const welcomeScreenOpen = document.querySelector("#welcomeopen");
  
  let biggestIndex = 1;
  let selectedIcon = null;
  
  // Window functions
  function closeWindow(element) {
    if (!element) return;
    element.style.display = "none";
  }
  
  function openWindow(element) {
    if (!element) return;
  
    if (element.id === "welcome") {
      element.style.display = "unset";
    } else {
      element.style.display = "flex";
    }
  
    biggestIndex++;
    element.style.zIndex = biggestIndex;
  
    if (topBar) {
      topBar.style.zIndex = biggestIndex + 1;
    }
  }
  
  function handleWindowTap(element) {
    if (!element) return;
  
    biggestIndex++;
    element.style.zIndex = biggestIndex;
  
    if (topBar) {
      topBar.style.zIndex = biggestIndex + 1;
    }
  
    deselectIcon(selectedIcon);
  }
  
  // Icon functions
  function selectIcon(element) {
    if (!element) return;
  
    element.classList.add("selected");
    selectedIcon = element;
  }
  
  function deselectIcon(element) {
    if (!element) return;
  
    element.classList.remove("selected");
    selectedIcon = null;
  }
  
  function handleIconTap(iconElement, windowElement) {
    if (!iconElement || !windowElement) return;
  
    if (iconElement.classList.contains("selected")) {
      deselectIcon(iconElement);
      openWindow(windowElement);
    } else {
      selectIcon(iconElement);
    }
  }
  
  // Event listeners
  if (welcomeScreenClose) {
    welcomeScreenClose.addEventListener("click", () => {
      closeWindow(welcomeScreen);
    });
  }
  
  if (notesScreenClose) {
    notesScreenClose.addEventListener("click", () => {
      closeWindow(notesScreen);
    });
  }
  const notesIcon = document.querySelector("#notesicon");

  if (notesIcon) {
    notesIcon.addEventListener("click", () => {
      openWindow(notesScreen);
    });
  }
  if (welcomeScreenOpen) {
    welcomeScreenOpen.addEventListener("click", () => {
      openWindow(welcomeScreen);
    });
  }
  
  // Make windows draggable
  makeDraggable(welcomeScreen);
  makeDraggable(notesScreen);
  
  // Bring windows to front when clicked
  function addWindowTapHandling(element) {
    if (!element) return;
  
    element.addEventListener("mousedown", () => {
      handleWindowTap(element);
    });
  }
  
  addWindowTapHandling(welcomeScreen);
  addWindowTapHandling(notesScreen);

  function initializeWindow(elementName) {
    var screen = document.querySelector("#" + elementName)
    addWindowTapHandling(screen)
    makeClosable(elementName)
    dragElement(screen)
  }