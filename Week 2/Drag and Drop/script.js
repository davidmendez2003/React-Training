document.addEventListener("DOMContentLoaded", () => {
  const dropZones = document.querySelectorAll("#firstBox, #secondBox, #thirdBox");
  const items = document.querySelectorAll("#item1, #item2, #item3");

 
  items.forEach(item => {
    item.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", e.target.id);
    });
  });
  dropZones.forEach(zone => {
    zone.addEventListener("dragover", function (e) {
      e.preventDefault(); 
    });

    zone.addEventListener("drop", function (e) {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      const draggedItem = document.getElementById(draggedId);
      if (draggedItem) {
        zone.appendChild(draggedItem);
      }
    });
  });
});
