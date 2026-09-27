/*=============== 1. MOBILE NAVIGATION & HEADER SCROLL ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose && navMenu) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu) navMenu.classList.remove('show-menu');
  });
});

const bgHeader = () => {
  const header = document.getElementById('header');
  if (!header) return;
  if (window.scrollY >= 40) {
    header.classList.add('bg-header');
  } else {
    header.classList.remove('bg-header');
  }
};
window.addEventListener('scroll', bgHeader, { passive: true });
bgHeader();

/*=============== 2. GSAP HERO ANIMATION (Reduced-Motion Safe) ===============*/
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
  gsap.from('.home__img-2', { duration: 1.0, opacity: 0, y: 120, delay: 0.05, ease: 'power3.out' });
  gsap.from('.home__img-3', { duration: 1.0, opacity: 0, y: 140, delay: 0.15, ease: 'power3.out' });
  gsap.from('.home__bird-1', { duration: 0.9, opacity: 0, x: -50, delay: 0.25, ease: 'power2.out' });
  gsap.from('.home__bird-2', { duration: 0.9, opacity: 0, x: 50, delay: 0.3, ease: 'power2.out' });
  gsap.from('.home__img-1', { duration: 1.0, opacity: 0, y: 120, delay: 0.25, ease: 'power3.out' });
  gsap.from('.home__img-4', { duration: 1.1, opacity: 0, x: 120, delay: 0.3, ease: 'power3.out' });
}

/*=============== 3. BASECAMP DOSSIER DATA & MODAL ===============*/
const BASECAMP_DOSSIERS = {
  'aiguille-ridge': {
    region: 'Chamonix Mont-Blanc · High Alpine Sector',
    title: 'Aiguille Granite Ridge Outpost',
    coords: '45°55\'23"N 06°52\'11"E',
    approach: '6.4 km · +680m Vertical',
    water: 'UV-C Glacial Melt Tap',
    price: '$340 / night',
    rateNum: 340,
    description:
      'Anchored onto a sustainably cantilevered larch and cedar platform at 2,480 meters, Aiguille Granite Ridge offers direct crampon access to the Bossons glacial moraine and Aiguille du Midi traverse trails.',
    gear: [
      'NordicCanvas 420gsm dual-wall insulated tent with storm guy-lines',
      'SeekOutside collapsible titanium wood stove + 40 kg seasoned birch logs',
      '4x Western Mountaineering -18°C goose down sleeping bags & R-7.3 pads',
      '1.8 kWh LiFePO4 solar battery bank with USB-C PD & 230V inverter',
      'Garmin inReach Messenger satellite telemetry & Petzl glacier crampon locker'
    ]
  },
  'sylarna-pine': {
    region: 'Jämtland Boreal Reserve · Sweden',
    title: 'Sylarna Mirror Lake Sanctuary',
    coords: '63°02\'19"N 12°16\'40"E',
    approach: '4.2 km · +140m Gentle Trail',
    water: '0.02-Micron Lake Ultrafiltration',
    price: '$260 / night',
    rateNum: 260,
    description:
      'Positioned on a quiet granite and moss peninsula jutting into a glacial mirror lake. Designed for canoe portage explorations, fly-fishing for Arctic char, and restorative wood-fired sauna sessions.',
    gear: [
      '24m² Outfitter Wall Tent with covered cedar rain porch',
      'Private 16-foot cedar-strip canoe, paddles, and PFDs moored at dock',
      'Shoreline wood-fired barrel sauna tent with direct cold-plunge ladder',
      'Snow Peak titanium camp kitchen, cast-iron skillet, and coffee roaster',
      '4-season -10°C down sleep systems and merino wool camp blankets'
    ]
  },
  'naeroy-bluff': {
    region: 'Aurland Fjord Coast · Western Norway',
    title: 'Nærøyfjord Sea Bluff Point',
    coords: '60°56\'41"N 06°56\'08"E',
    approach: '5.1 km Rim Trail or Sea Kayak',
    water: 'Highland Waterfall Gravity Tap',
    price: '$310 / night',
    rateNum: 310,
    description:
      'Suspended 490 meters above the UNESCO-protected waters of Nærøyfjord, this storm-guyed geodesic and wall-tent hybrid withstands 95 km/h coastal gusts while framing 180-degree fjord views.',
    gear: [
      'Storm-rated geodesic canvas shelter with overhead aurora viewing skylight',
      '2x tandem fiberglass expedition sea kayaks staged at lower cove boathouse',
      'Titanium wood burner + drysuit drying rack in vestibule',
      'Marine VHF transceiver + Garmin inReach satellite weather link',
      'Full freeze-dried & vacuum-cured Nordic fish provisioning locker'
    ]
  },
  'tre-cime-col': {
    region: 'Sesto Dolomites · South Tyrol, Italy',
    title: 'Tre Cime Limestone Saddle Camp',
    coords: '46°37\'07"N 12°18\'20"E',
    approach: '5.8 km · +590m Dolomite Trail',
    water: 'Solar-Heated Alpine Cistern',
    price: '$390 / night',
    rateNum: 390,
    description:
      'Set on a high limestone saddle at 2,740 meters facing the north walls of Tre Cime di Lavaredo. Built for via ferrata scramblers, alpine photographers, and high-altitude culinary treks.',
    gear: [
      'High-altitude insulated wall tent with reinforced snow-load ridge beam',
      '4x UIAA-certified via ferrata shock-absorbing lanyard sets & helmets',
      'Italian stovetop Moka espresso bar + South Tyrolean speck & polenta rations',
      '1.8 kWh solar microgrid with heated boot & glove drying pegs',
      'Direct radio link to Rifugio & Cortina mountain rescue desk'
    ]
  },
  'teton-tarn': {
    region: 'Grand Teton Backcountry · Wyoming, USA',
    title: 'Cascade Canyon Subalpine Tarn',
    coords: '43°46\'12"N 110°49\'54"W',
    approach: '7.6 km · +490m Canyon Trail',
    water: 'Glacial Creek UV Purifier',
    price: '$285 / night',
    rateNum: 285,
    description:
      'Tucked beneath towering granite fins in the Teton backcountry. Engineered for multi-day wildlife observation, peak bagging, and zero-trace subalpine family expeditions.',
    gear: [
      ' Dual-cabin outfitter tent complex accommodating up to 8 campers',
      'IGBC-certified steel bear-resistant food caches & canisters + counter-assault spray',
      'Swarovski 85mm spotting scope on carbon tripod for wildlife glassing',
      'Titanium wood stove + zero-degree down quilts and elevated cots',
      'Jackson Hole dispatch satellite beacon & topographic route maps'
    ]
  },
  'lofoten-headland': {
    region: 'Lofoten Archipelago · Arctic Circle, Norway',
    title: 'Kvalvika Arctic Granite Headland',
    coords: '68°04\'51"N 13°32\'19"E',
    approach: '3.8 km · +280m Coastal Pass',
    water: 'Peat-Filtered Mountain Spring',
    price: '$330 / night',
    rateNum: 330,
    description:
      'Located above the北-facing turf cliffs of Kvalvika Beach at 68° North. Purpose-built for autumn geomagnetic aurora photography and summer midnight-sun ridge traverses.',
    gear: [
      '110 km/h hurricane-tested turf-insulated canvas shelter',
      'Astrophotography carbon tripods + dew-heater power strips at deck rail',
      'Sub-arctic -15°C sleeping bags + Norwegian wool thermal base blankets',
      'Real-time KP-Index geomagnetic storm alert receiver',
      '24-hour rations including Lofoten stockfish stew & cloudberry preserves'
    ]
  }
};

/*=============== 4. DESTINATIONS FILTERING, SEARCH & SORT ===============*/
const filterButtons = document.querySelectorAll('[data-filter]');
const searchInput = document.getElementById('destination-search');
const sortSelect = document.getElementById('destination-sort');
const destinationsGrid = document.getElementById('destinations-grid');
const destinationsEmpty = document.getElementById('destinations-empty');
const resetFiltersBtn = document.getElementById('reset-destination-filters');

let activeCategory = 'all';

function updateDestinationsView() {
  if (!destinationsGrid) return;
  const cards = Array.from(destinationsGrid.querySelectorAll('.camp-card'));
  const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const sortMode = sortSelect ? sortSelect.value : 'featured';

  let visibleCount = 0;

  cards.forEach((card) => {
    const category = card.getAttribute('data-category');
    const textContent = card.textContent.toLowerCase();
    const matchesCategory = activeCategory === 'all' || category === activeCategory;
    const matchesQuery = !query || textContent.includes(query);

    if (matchesCategory && matchesQuery) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Sort cards in DOM
  const sortedCards = [...cards].sort((a, b) => {
    const elevA = Number(a.getAttribute('data-elevation')) || 0;
    const elevB = Number(b.getAttribute('data-elevation')) || 0;
    const priceA = Number(a.getAttribute('data-price')) || 0;
    const priceB = Number(b.getAttribute('data-price')) || 0;

    if (sortMode === 'elevation-desc') return elevB - elevA;
    if (sortMode === 'price-asc') return priceA - priceB;
    if (sortMode === 'price-desc') return priceB - priceA;
    return 0;
  });

  sortedCards.forEach((card) => destinationsGrid.appendChild(card));

  if (destinationsEmpty) {
    destinationsEmpty.hidden = visibleCount > 0;
  }
}

document.querySelectorAll('.destinations .segmented-control__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.destinations .segmented-control__btn').forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    activeCategory = btn.getAttribute('data-filter') || 'all';
    updateDestinationsView();
  });
});

document.querySelectorAll('.js-footer-filter').forEach((link) => {
  link.addEventListener('click', () => {
    const targetFilter = link.getAttribute('data-filter') || 'all';
    const matchingBtn = document.querySelector(`.destinations .segmented-control__btn[data-filter="${targetFilter}"]`);
    if (matchingBtn) matchingBtn.click();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', updateDestinationsView);
}

if (sortSelect) {
  sortSelect.addEventListener('change', updateDestinationsView);
}

if (resetFiltersBtn) {
  resetFiltersBtn.addEventListener('click', () => {
    activeCategory = 'all';
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'featured';
    const allBtn = document.querySelector('.destinations .segmented-control__btn[data-filter="all"]');
    if (allBtn) allBtn.click();
    updateDestinationsView();
  });
}

/*=============== 5. INSPECT CAMP MODAL & SELECT BASECAMP ===============*/
const campModal = document.getElementById('camp-modal');
const closeCampModalBtn = document.getElementById('close-camp-modal');
const cancelCampModalBtn = document.getElementById('camp-modal-cancel');
const bookCampModalBtn = document.getElementById('camp-modal-book');
let currentInspectedCampId = null;

function openCampModal(campId) {
  const data = BASECAMP_DOSSIERS[campId];
  if (!data || !campModal) return;
  currentInspectedCampId = campId;

  document.getElementById('camp-modal-region').textContent = data.region;
  document.getElementById('camp-modal-title').textContent = data.title;
  document.getElementById('camp-modal-coords').textContent = data.coords;
  document.getElementById('camp-modal-approach').textContent = data.approach;
  document.getElementById('camp-modal-water').textContent = data.water;
  document.getElementById('camp-modal-price').textContent = data.price;
  document.getElementById('camp-modal-desc').textContent = data.description;

  const gearList = document.getElementById('camp-modal-gear');
  gearList.innerHTML = '';
  data.gear.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    gearList.appendChild(li);
  });

  campModal.hidden = false;
  campModal.setAttribute('aria-hidden', 'false');
}

function closeCampModal() {
  if (!campModal) return;
  campModal.hidden = true;
  campModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.js-inspect-camp').forEach((btn) => {
  btn.addEventListener('click', () => {
    const campId = btn.getAttribute('data-camp-id');
    openCampModal(campId);
  });
});

if (closeCampModalBtn) closeCampModalBtn.addEventListener('click', closeCampModal);
if (cancelCampModalBtn) cancelCampModalBtn.addEventListener('click', closeCampModal);

if (bookCampModalBtn) {
  bookCampModalBtn.addEventListener('click', () => {
    const data = BASECAMP_DOSSIERS[currentInspectedCampId];
    closeCampModal();
    if (data) {
      selectCampInForm(data.title);
    }
  });
}

function selectCampInForm(campName) {
  const campSelect = document.getElementById('res-camp');
  if (campSelect) {
    Array.from(campSelect.options).forEach((opt) => {
      if (opt.value === campName) {
        campSelect.value = campName;
      }
    });
    updateLiveEstimate();
  }
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

document.querySelectorAll('.js-select-camp').forEach((btn) => {
  btn.addEventListener('click', () => {
    const campName = btn.getAttribute('data-camp-name');
    selectCampInForm(campName);
  });
});

/*=============== 6. CAPABILITIES BENTO & HARDWARE MANIFEST ===============*/
const MANIFEST_DATA = {
  outfitting: {
    title: 'Hardware Specification: 01. Turnkey Basecamp Outfitting',
    rows: [
      ['Primary Shelter', 'NordicCanvas 420gsm Ripstop Wall Tent', '110 km/h Wind · 4,000mm HH', 'Pre-pitched'],
      ['Heating Unit', 'SeekOutside Titanium Collapsible Wood Stove', '-20°C Exterior / +19°C Interior', '1.95 kg'],
      ['Sleep System', 'Western Mountaineering 850-Fill + R-7.3 Pad', 'ISO Comfort -16°C', '1.42 kg'],
      ['Galley Kit', 'Snow Peak Titanium Cookset & Primus Multi-Fuel', '3,200W Simmer Control', '0.88 kg']
    ]
  },
  solar: {
    title: 'Hardware Specification: 02. Zero-Trace Solar Microgrids',
    rows: [
      ['Energy Storage', 'Solid-State LiFePO4 Heated Field Battery', '1,840 Wh · -25°C Self-Heating', 'Pre-staged'],
      ['Solar Array', 'Bifacial Monocrystalline Folding Ridge Panels', '400W Peak · IP68 Weatherproof', 'Pre-staged'],
      ['Water Purification', 'Dual-Stage 0.02µm Ultrafiltration + UV-C Reactor', '99.9999% Pathogen Removal', '24 L/hr'],
      ['Waste Protocol', 'Sealed Composting & Pack-Out Container System', 'ISO 14001 Zero Soil Impact', '100% Certified']
    ]
  },
  dispatch: {
    title: 'Hardware Specification: 03. Satellite Weather & Rescue Dispatch',
    rows: [
      ['Satellite Link', 'Garmin inReach Messenger + Iridium Mesh', '100% Global Pole-to-Pole SOS', '0.11 kg'],
      ['Weather Telemetry', 'Kestrel 5500AG Barometric Anemometer Station', 'Live Wind, Dewpoint & Pressure', 'Pre-staged'],
      ['Avalanche Kit', 'Mammut Barryvox S2 Transceiver, Probe & Shovel', '70m Digital Search Strip', '1.15 kg'],
      ['Medical Locker', 'Wilderness EMT Trauma, Hypothermia & O2 Kit', 'IFMGA Alpine Standard', 'Pre-staged']
    ]
  }
};

function setManifestCategory(key) {
  const entry = MANIFEST_DATA[key];
  if (!entry) return;

  const titleEl = document.getElementById('manifest-active-title');
  const tbodyEl = document.getElementById('manifest-tbody');
  if (titleEl) titleEl.textContent = entry.title;

  if (tbodyEl) {
    tbodyEl.innerHTML = '';
    entry.rows.forEach((cols) => {
      const tr = document.createElement('tr');
      cols.forEach((colText) => {
        const td = document.createElement('td');
        td.textContent = colText;
        tr.appendChild(td);
      });
      tbodyEl.appendChild(tr);
    });
  }

  document.querySelectorAll('.manifest__tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.getAttribute('data-manifest') === key);
  });

  document.querySelectorAll('.bento-card[data-capability]').forEach((card) => {
    const isMatch = card.getAttribute('data-capability') === key;
    card.classList.toggle('is-selected', isMatch);
    card.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
  });
}

document.querySelectorAll('.manifest__tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    setManifestCategory(tab.getAttribute('data-manifest'));
  });
});

document.querySelectorAll('.bento-card[data-capability]').forEach((card) => {
  card.addEventListener('click', () => {
    setManifestCategory(card.getAttribute('data-capability'));
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setManifestCategory(card.getAttribute('data-capability'));
    }
  });
});

/*=============== 7. SCHEDULED EVENTS FILTER & BOOKING ===============*/
document.querySelectorAll('.js-event-filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.js-event-filter').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const season = btn.getAttribute('data-season');
    const rows = document.querySelectorAll('#events-tbody tr');

    rows.forEach((row) => {
      const rowSeason = row.getAttribute('data-season');
      row.style.display = season === 'all' || rowSeason === season ? '' : 'none';
    });
  });
});

document.querySelectorAll('.js-book-event').forEach((btn) => {
  btn.addEventListener('click', () => {
    const eventTitle = btn.getAttribute('data-event-title');
    const campName = btn.getAttribute('data-camp');
    const eventDate = btn.getAttribute('data-date');

    const campSelect = document.getElementById('res-camp');
    const dateInput = document.getElementById('res-date');
    const nightsSelect = document.getElementById('res-nights');
    const notesInput = document.getElementById('res-notes');

    if (campSelect && campName) campSelect.value = campName;
    if (dateInput && eventDate) dateInput.value = eventDate;
    if (nightsSelect) nightsSelect.value = '4';
    if (notesInput && eventTitle) {
      notesInput.value = `Scheduled Convocation Berth Request: ${eventTitle}`;
    }

    updateLiveEstimate();
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  });
});

/*=============== 8. PRICING MODE TOGGLE & TIER SELECTION ===============*/
document.querySelectorAll('.js-pricing-mode').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.js-pricing-mode').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const mode = btn.getAttribute('data-mode');

    document.querySelectorAll('.pricing-card__amount').forEach((el) => {
      el.textContent = mode === 'season' ? el.getAttribute('data-season') : el.getAttribute('data-expedition');
    });

    document.querySelectorAll('.pricing-card__period').forEach((el) => {
      el.textContent =
        mode === 'season' ? el.getAttribute('data-season-label') : el.getAttribute('data-expedition-label');
    });
  });
});

document.querySelectorAll('.js-select-tier').forEach((btn) => {
  btn.addEventListener('click', () => {
    const tierName = btn.getAttribute('data-tier');
    const defaultGuests = btn.getAttribute('data-guests');
    const tierSelect = document.getElementById('res-tier');
    const guestsInput = document.getElementById('res-guests');

    if (tierSelect && tierName) tierSelect.value = tierName;
    if (guestsInput && defaultGuests) guestsInput.value = defaultGuests;

    updateLiveEstimate();
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  });
});

/*=============== 9. LIVE EXPEDITION COST ESTIMATOR & FORM VALIDATION ===============*/
const resCamp = document.getElementById('res-camp');
const resTier = document.getElementById('res-tier');
const resNights = document.getElementById('res-nights');
const resGuests = document.getElementById('res-guests');
const addonCheckboxes = document.querySelectorAll('input[name="addon"]');

function calculateEstimate() {
  const selectedCampOption = resCamp ? resCamp.options[resCamp.selectedIndex] : null;
  const baseNightlyRate = selectedCampOption ? Number(selectedCampOption.getAttribute('data-rate')) || 340 : 340;
  const campName = resCamp ? resCamp.value : 'Aiguille Granite Ridge Outpost';

  const selectedTierOption = resTier ? resTier.options[resTier.selectedIndex] : null;
  const tierMultiplier = selectedTierOption ? Number(selectedTierOption.getAttribute('data-multiplier')) || 1 : 1;
  const tierName = resTier ? resTier.value : 'Basecamp Duo & Quad';

  const nights = resNights ? Math.max(1, Number(resNights.value) || 3) : 3;
  const guests = resGuests ? Math.min(8, Math.max(1, Number(resGuests.value) || 2)) : 2;

  let addonsTotal = 0;
  const selectedAddonLabels = [];
  addonCheckboxes.forEach((cb) => {
    if (cb.checked) {
      addonsTotal += Number(cb.value) || 0;
      selectedAddonLabels.push(cb.getAttribute('data-label'));
    }
  });

  const accommodationTotal = Math.round(baseNightlyRate * tierMultiplier * nights);
  const grandTotal = accommodationTotal + addonsTotal;

  return {
    campName,
    tierName,
    nights,
    guests,
    addonsTotal,
    selectedAddonLabels,
    grandTotal
  };
}

function updateLiveEstimate() {
  const est = calculateEstimate();
  const campEl = document.getElementById('est-camp');
  const tierEl = document.getElementById('est-tier');
  const durEl = document.getElementById('est-duration');
  const addonsEl = document.getElementById('est-addons');
  const totalEl = document.getElementById('est-total');

  if (campEl) campEl.textContent = est.campName;
  if (tierEl) tierEl.textContent = est.tierName;
  if (durEl) durEl.textContent = `${est.nights} Nights · ${est.guests} ${est.guests === 1 ? 'Guest' : 'Guests'}`;
  if (addonsEl) addonsEl.textContent = `$${est.addonsTotal.toLocaleString()}`;
  if (totalEl) totalEl.textContent = `$${est.grandTotal.toLocaleString()}`;
}

[resCamp, resTier, resNights, resGuests].forEach((input) => {
  if (input) {
    input.addEventListener('change', updateLiveEstimate);
    input.addEventListener('input', updateLiveEstimate);
  }
});

addonCheckboxes.forEach((cb) => {
  cb.addEventListener('change', updateLiveEstimate);
});

updateLiveEstimate();

/* Form Validation & Submission */
const reserveForm = document.getElementById('reserve-form');
const reserveConfirmation = document.getElementById('reserve-confirmation');
const confirmationDetails = document.getElementById('confirmation-details');
const downloadItineraryBtn = document.getElementById('download-itinerary-btn');
const newReservationBtn = document.getElementById('new-reservation-btn');

let lastConfirmedDossierText = '';

function validateReservationForm() {
  let isValid = true;
  const nameInput = document.getElementById('res-name');
  const emailInput = document.getElementById('res-email');
  const phoneInput = document.getElementById('res-phone');
  const dateInput = document.getElementById('res-date');

  const errName = document.getElementById('err-name');
  const errEmail = document.getElementById('err-email');
  const errPhone = document.getElementById('err-phone');
  const errDate = document.getElementById('err-date');

  [nameInput, emailInput, phoneInput, dateInput].forEach((el) => el && el.classList.remove('is-invalid'));
  [errName, errEmail, errPhone, errDate].forEach((el) => {
    if (el) el.textContent = '';
  });

  if (!nameInput || nameInput.value.trim().length < 2) {
    if (nameInput) nameInput.classList.add('is-invalid');
    if (errName) errName.textContent = 'Please enter your full name (at least 2 characters).';
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
    if (emailInput) emailInput.classList.add('is-invalid');
    if (errEmail) errEmail.textContent = 'Please provide a valid email address for dispatch briefing.';
    isValid = false;
  }

  const phoneRegex = /^[+\d\s()-]{7,22}$/;
  if (!phoneInput || !phoneRegex.test(phoneInput.value.trim())) {
    if (phoneInput) phoneInput.classList.add('is-invalid');
    if (errPhone) errPhone.textContent = 'Enter a valid mobile or satellite number (7–22 digits).';
    isValid = false;
  }

  if (!dateInput || !dateInput.value) {
    if (dateInput) dateInput.classList.add('is-invalid');
    if (errDate) errDate.textContent = 'Please select a target check-in date.';
    isValid = false;
  }

  return isValid;
}

if (reserveForm) {
  reserveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateReservationForm()) return;

    const est = calculateEstimate();
    const nameVal = document.getElementById('res-name').value.trim();
    const emailVal = document.getElementById('res-email').value.trim();
    const phoneVal = document.getElementById('res-phone').value.trim();
    const dateVal = document.getElementById('res-date').value;
    const notesVal = document.getElementById('res-notes').value.trim() || 'Standard provisioning';
    const refCode = 'NC-' + Math.floor(100000 + Math.random() * 900000);

    lastConfirmedDossierText = [
      'NORDICCAMP WILDERNESS OUTPOSTS — EXPEDITION DISPATCH DOSSIER',
      `Reservation Reference: ${refCode}`,
      `Primary Explorer: ${nameVal} (${emailVal} · ${phoneVal})`,
      `Target Outpost: ${est.campName}`,
      `Pass / Charter Tier: ${est.tierName}`,
      `Check-In Date: ${dateVal} (${est.nights} Nights · ${est.guests} Guests)`,
      `Technical Add-Ons: ${est.selectedAddonLabels.length ? est.selectedAddonLabels.join(', ') : 'None'}`,
      `Field Notes: ${notesVal}`,
      `Estimated Total (Incl. Backcountry Permits): $${est.grandTotal.toLocaleString()}`
    ].join('\n');

    if (confirmationDetails) {
      confirmationDetails.innerHTML = `
        <div><strong>Dispatch Reference:</strong> ${refCode}</div>
        <div><strong>Explorer:</strong> ${nameVal} · ${emailVal}</div>
        <div><strong>Basecamp Outpost:</strong> ${est.campName}</div>
        <div><strong>Schedule:</strong> Check-in ${dateVal} (${est.nights} Nights · ${est.guests} Guests)</div>
        <div><strong>Tier &amp; Add-Ons:</strong> ${est.tierName} ($${est.grandTotal.toLocaleString()} total)</div>
      `;
    }

    reserveForm.hidden = true;
    if (reserveConfirmation) reserveConfirmation.hidden = false;
  });
}

if (downloadItineraryBtn) {
  downloadItineraryBtn.addEventListener('click', () => {
    if (!lastConfirmedDossierText) return;
    const blob = new Blob([lastConfirmedDossierText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'NordicCamp-Expedition-Dossier.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
}

if (newReservationBtn) {
  newReservationBtn.addEventListener('click', () => {
    if (reserveConfirmation) reserveConfirmation.hidden = true;
    if (reserveForm) reserveForm.hidden = false;
  });
}

/*=============== 10. MEMBER LOCKER MODAL & LNT PROTOCOL ===============*/
const loginModal = document.getElementById('login-modal');
const openLoginBtn = document.getElementById('open-login-modal');
const openLoginFooterBtn = document.getElementById('open-login-footer');
const openLntPolicyBtn = document.getElementById('open-lnt-policy');
const closeLoginModalBtn = document.getElementById('close-login-modal');
const memberLoginForm = document.getElementById('member-login-form');
const demoMemberBtn = document.getElementById('demo-member-btn');
const memberDashboard = document.getElementById('member-dashboard');
const memberSignoutBtn = document.getElementById('member-signout-btn');
const memberLoginError = document.getElementById('member-login-error');

function openLoginModal() {
  if (!loginModal) return;
  loginModal.hidden = false;
  loginModal.setAttribute('aria-hidden', 'false');
}

function closeLoginModal() {
  if (!loginModal) return;
  loginModal.hidden = true;
  loginModal.setAttribute('aria-hidden', 'true');
}

if (openLoginBtn) openLoginBtn.addEventListener('click', openLoginModal);
if (openLoginFooterBtn) openLoginFooterBtn.addEventListener('click', openLoginModal);
if (closeLoginModalBtn) closeLoginModalBtn.addEventListener('click', closeLoginModal);

if (openLntPolicyBtn) {
  openLntPolicyBtn.addEventListener('click', () => {
    openCampModal('sylarna-pine');
  });
}

function showAuthenticatedMember(emailText) {
  if (memberLoginError) memberLoginError.textContent = '';
  const displayName = document.getElementById('member-display-name');
  if (displayName) {
    const namePart = emailText.split('@')[0].replace(/[._-]/g, ' ');
    displayName.textContent = namePart ? namePart.replace(/\b\w/g, (l) => l.toUpperCase()) : 'Erik Lindqvist';
  }
  if (memberLoginForm) memberLoginForm.hidden = true;
  if (memberDashboard) memberDashboard.hidden = false;
  if (openLoginBtn) openLoginBtn.textContent = 'Member Locker (Active)';
}

if (memberLoginForm) {
  memberLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = document.getElementById('member-email').value.trim();
    const passVal = document.getElementById('member-pass').value.trim();
    if (!emailVal.includes('@') || passVal.length < 4) {
      if (memberLoginError) {
        memberLoginError.textContent = 'Enter a valid member email and Pass ID (or click Load Demo Season Pass).';
      }
      return;
    }
    showAuthenticatedMember(emailVal);
  });
}

if (demoMemberBtn) {
  demoMemberBtn.addEventListener('click', () => {
    document.getElementById('member-email').value = 'erik.lindqvist@uppsala-alpine.se';
    document.getElementById('member-pass').value = 'NC-2026-8841';
    showAuthenticatedMember('erik.lindqvist@uppsala-alpine.se');
  });
}

if (memberSignoutBtn) {
  memberSignoutBtn.addEventListener('click', () => {
    if (memberDashboard) memberDashboard.hidden = true;
    if (memberLoginForm) memberLoginForm.hidden = false;
    if (openLoginBtn) openLoginBtn.textContent = 'Member Sign In';
  });
}

/* Close modals on Escape or backdrop click */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCampModal();
    closeLoginModal();
  }
});

[campModal, loginModal].forEach((modal) => {
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCampModal();
        closeLoginModal();
      }
    });
  }
});
