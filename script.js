const rules = {
  // 🥦 Organic & Kitchen Waste
  "apple core": { bin: "green", steps: ["Compost if possible.", "Dispose in green bin."] },
  "banana peel": { bin: "green", steps: ["Can be composted.", "Use green bin."] },
  "vegetables": { bin: "green", steps: ["Compost leftover or spoiled vegetables.", "Dispose in green bin."] },
  "fruit peel": { bin: "green", steps: ["Compost or dispose in green bin."] },
  "orange": { bin: "green", steps: ["Peels can be composted.", "Dispose in green bin."] },
  "lemon": { bin: "green", steps: ["Can be composted.", "Dispose in green bin."] },
  "tea leaves": { bin: "green", steps: ["Can be composted easily.", "Dispose in green bin."] },
  "egg shell": { bin: "green", steps: ["Crush before composting.", "Dispose in green bin."] },
  "bread": { bin: "green", steps: ["Compost if stale.", "Dispose in green bin."] },
  "food waste": { bin: "green", steps: ["Compost if possible.", "Dispose in green bin."] },
  "cooked rice": { bin: "green", steps: ["Put in compost bin or green waste bin."] },
  "fish bones": { bin: "green", steps: ["Wrap and dispose in green bin."] },

  // 🧴 Plastic & Dry Waste
  "plastic bottle": { bin: "blue", steps: ["Rinse and dry.", "Crush before putting in blue bin."] },
  "milk packet": { bin: "blue", steps: ["Empty, rinse and dry.", "Dispose in blue bin."] },
  "chips packet": { bin: "blue", steps: ["Clean and dry.", "Dispose in blue bin."] },
  "plastic cover": { bin: "blue", steps: ["Clean and dry.", "Dispose in blue bin."] },
  "tiffin box": { bin: "blue", steps: ["Dispose in dry waste (blue bin)."] },
  "toothbrush": { bin: "blue", steps: ["Dispose in dry waste (blue bin)."] },
  "plastic cup": { bin: "blue", steps: ["Rinse and dispose in blue bin."] },
  "plastic spoon": { bin: "blue", steps: ["Dispose in blue bin."] },
  "juice carton": { bin: "blue", steps: ["Empty and dispose in blue bin."] },

  // 📄 Paper, Metal & Glass
  "paper": { bin: "blue", steps: ["Keep dry and clean.", "Dispose in blue bin."] },
  "newspaper": { bin: "blue", steps: ["Fold neatly and dispose in blue bin."] },
  "cardboard": { bin: "blue", steps: ["Flatten boxes before disposal.", "Dispose in blue bin."] },
  "metal can": { bin: "blue", steps: ["Rinse and dry.", "Dispose in blue bin."] },
  "glass bottle": { bin: "blue", steps: ["Rinse; handle carefully.", "Dispose in blue bin."] },
  "aluminum foil": { bin: "blue", steps: ["Clean if possible.", "Dispose in blue bin."] },

  // ⚡ E-Waste & Hazardous
  "phone": { bin: "black", steps: ["Erase data.", "Drop at e-waste center."] },
  "charger": { bin: "black", steps: ["Bundle wires.", "Drop at e-waste bin."] },
  "battery": { bin: "black", steps: ["Collect separately.", "Drop at e-waste center."] },
  "earphones": { bin: "black", steps: ["Do not mix with household waste.", "Drop in e-waste bin."] },
  "remote": { bin: "black", steps: ["Remove batteries first.", "Drop in e-waste bin."] },
  "light bulb": { bin: "black", steps: ["Handle carefully.", "Drop in e-waste bin."] },
  "tube light": { bin: "black", steps: ["Do not break.", "Drop in e-waste collection point."] },
  "laptop": { bin: "black", steps: ["Erase all data.", "Dispose at authorized e-waste center."] },

  // 🧹 Hygiene & Others
  "mask": { bin: "black", steps: ["Wrap securely.", "Dispose in black bin."] },
  "sanitary pad": { bin: "black", steps: ["Wrap securely.", "Dispose in black bin."] },
  "diaper": { bin: "black", steps: ["Wrap tightly.", "Dispose in black bin."] },
  "old clothes": { bin: "black", steps: ["Donate if reusable.", "Otherwise dispose in black bin."] },
  "broken glass": { bin: "black", steps: ["Wrap carefully in newspaper.", "Dispose in black bin."] },
  "shoes": { bin: "black", steps: ["Donate if wearable.", "Dispose in black bin."] },
  "toothpaste tube": { bin: "black", steps: ["Squeeze out completely.", "Dispose in black bin."] },
  "old medicines": { bin: "black", steps: ["Return to pharmacy or hazardous waste bin."] }


  

};


function showSuggestions() {
  const input = document.getElementById("itemInput");
  const suggestionsDiv = document.getElementById("suggestions");
  const query = input.value.trim().toLowerCase();

  if (!query) {
    suggestionsDiv.style.display = "none";
    return;
  }

  const matches = Object.keys(rules).filter(item => item.includes(query));
  if (matches.length > 0) {
    suggestionsDiv.innerHTML = matches.map(m => `<div onclick="selectSuggestion('${m}')">${m}</div>`).join("");
    suggestionsDiv.style.display = "block";
  } else {
    suggestionsDiv.style.display = "none";
  }
}

function selectSuggestion(item) {
  document.getElementById("itemInput").value = item;
  document.getElementById("suggestions").style.display = "none";
  searchItem();
}

function checkEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    searchItem();
  }
}

function searchItem() {
  const query = document.getElementById("itemInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");
  const loader = document.getElementById("loader");
  const suggestionsDiv = document.getElementById("suggestions");
  suggestionsDiv.style.display = "none";

  resultDiv.innerHTML = "";
  loader.style.display = "block";

  setTimeout(() => {
    loader.style.display = "none";
    if (!query) {
      resultDiv.innerHTML = "<p>Type an item name to search.</p>";
      return;
    }

    const matches = Object.keys(rules).filter(item => item.includes(query));
    if (matches.length > 0) {
      let output = "";
      matches.forEach(match => {
        const { bin, steps } = rules[match];
        const colorNames = {
          blue: "Blue Bin (Dry Waste)",
          green: "Green Bin (Wet Waste)",
          black: "Black Bin (Hazardous/E-waste)"
        };
        output += `
          <h2>${match.charAt(0).toUpperCase() + match.slice(1)}</h2>
          <ul class="steps">${steps.map(s => `<li>${s}</li>`).join("")}</ul>
          <div class="bin ${bin}">${colorNames[bin]}</div>
          <hr style="border:none;border-top:1px solid rgba(255,255,255,0.3);"/>
        `;
      });
      resultDiv.innerHTML = output;
    } else {
      resultDiv.innerHTML = `<p>⚠️ No info found for "${query}". Try general words like <b>food, plastic, battery</b>.</p>`;
    }
  }, 700);
}

const spots = [
  { name: "Dry", type: "Wrappers.. etc", location: "Near N 005" },
  { name: "Mixed", type: "General", location: "Near S 004B" },
  { name: "wet Waste", type: "Organic", location: "Near S 009B" },
  { name: "Mixed", type: "General", location: "near shreyas lab" },
  { name: "Dry", type: "Wrappers.. etc", location: "Near N 012A" },
  { name: "Plastic", type: "Recyclable", location: "1st floor Academic Block" },
  { name: "Dry", type: "Wrappers.. etc", location: "Near ICTS 1st floor" },
  { name: "Mixed", type: "General", location: "Near Deprtment of English 1st floor" },
  { name: "Dry", type: "Wrappers.. etc", location: "Near Hardware Lab 1st floor" },
  { name: "Dry", type: "Wrappers.. etc", location: "Near 1st floor Restroom" },
  { name: "Mixed", type: "General", location: "Near 1st floor N 104" },
  { name: "plastic", type: "Recyclable", location: "Near 1st floor Mens Restroom" },
  { name: "Dry", type: "Wrappers.. etc", location: "Near N 110" },
  { name: "Dry", type: "Wrappers.. etc", location: "Near 1st floor near stairs" },
  { name: "Wet Waste", type: "Organic", location: "2nd Floor north Hallway" },
  { name: "Wet Waste", type: "Organic", location: "2nd Mens Restroom" },
  { name: "Dry", type: "Wrappers.. etc", location: "Opp Amba Seminar Hall" },
  { name: "Dry", type: "Wrappers.. etc", location: "Near S 204G computing centre" },
  { name: "wet Waste", type: "Organic", location: "Near S 209-A" },
  { name: "wet Waste", type: "Organic", location: "Beside Mens Restroom 2nd Floor" },
  { name: "Wet Waste", type: "Organic", location: "Near N 303" },
  { name: "Dry", type: "Wrappers.. etc", location: "Near N 303E" },
  { name: "Mixed", type: "General", location: "Near 3nd floor near steps" },
  { name: "Wet Waste", type: "Organic", location: "Near N 309D" },
  { name: "MIxed", type: "General", location: "Near N 303A" },
  { name: "Plastic", type: "Recyclable", location: "Near S 303" },
  { name: "Wet Waste", type: "Organic", location: "Behind Hostel Block" },
];

const drives = [
  { title: "Beach Clean-Up Drive", date: "Nov 10, 2025", location: "Marina Beach", desc: "Join us to collect plastic waste from the coastline!" },
  { title: "Campus E-Waste Week", date: "Dec 2-6, 2025", location: "College Ground", desc: "Deposit old electronics responsibly!" }
];

const spotsList = document.getElementById("spotsList");
const drivesList = document.getElementById("drivesList");
spots.forEach(s => spotsList.innerHTML += `<div class="spot"><b>${s.name}</b><br>Type: ${s.type}<br>📍 ${s.location}</div>`);
drives.forEach(d => drivesList.innerHTML += `<div class="drive"><b>${d.title}</b><br>📅 ${d.date}<br>📍 ${d.location}<br>${d.desc}</div>`);