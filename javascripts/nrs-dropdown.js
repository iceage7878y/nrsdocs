/*
  Sidebar nav polish: per-resource sections collapse by default (with a
  hand-drawn chevron toggle button), and the "Resources" section header
  doesn't get that same button since it's not meant to collapse.
*/
(function () {
  var RESOURCES = [
    'Ice_ambulancejob',
    'Ice_crafting',
    'Ice_factions',
    'Ice_fleetkiosk',
    'Ice_ownablebanks',
    'Ice_policejob',
    'Ice_radio',
    'Ice_tablet',
  ];

  // Every per-resource sidebar section (Ice_ambulancejob, Ice_radio, ...)
  // starts collapsed — EXCEPT the one containing the page you're currently
  // on, which Material already expands by default and which must stay
  // untouched here. Every navigation is a full page load (no instant-nav),
  // so this runs fresh on every click; forcing it closed unconditionally
  // used to fight normal in-section browsing (clicking "Installation"
  // reloads the page, re-runs this, and used to re-collapse the very
  // section you were browsing). Only the toggle button should ever change
  // collapse state now — this only sets the *initial* state per load.
  function setupResourceToggles() {
    var toggles = document.querySelectorAll('input.md-nav__toggle');
    toggles.forEach(function (input) {
      var li = input.closest('.md-nav__item');
      if (!li) return;
      var link = li.querySelector(':scope > .md-nav__link a, :scope > a.md-nav__link');
      var text = link ? link.textContent.trim() : '';
      if (RESOURCES.indexOf(text) === -1) return;

      if (!li.classList.contains('md-nav__item--active')) {
        input.checked = false;
      }

      var label = li.querySelector('label[for="' + input.id + '"]');
      if (!label) return;
      // Set initial state with no 'nrs-animate' class — no transition fires.
      label.classList.remove('nrs-animate');
      label.classList.toggle('nrs-open', input.checked);

      // Real clicks fire 'change' — that's the only time it should animate.
      input.addEventListener('change', function () {
        label.classList.add('nrs-animate');
        label.classList.toggle('nrs-open', input.checked);
      });
    });
  }

  // The sidebar drawer's own "Resources" section header picks up the same
  // toggle-button CSS as the individual resources underneath it (both are
  // .md-nav__item--nested). It doesn't need its own visible toggle button —
  // clicking the name already navigates there.
  function hideResourcesOwnToggleButton() {
    var toggles = document.querySelectorAll('input.md-nav__toggle');
    toggles.forEach(function (input) {
      var li = input.closest('.md-nav__item');
      if (!li) return;
      var link = li.querySelector(':scope > .md-nav__link a, :scope > a.md-nav__link');
      var text = link ? link.textContent.trim() : '';
      if (text !== 'Resources') return;

      var label = li.querySelector('label[for="' + input.id + '"]');
      if (label) label.style.display = 'none';
    });
  }

  function init() {
    setupResourceToggles();
    hideResourcesOwnToggleButton();
  }

  // With navigation.instant on, Material swaps page content via fetch and
  // never fires another DOMContentLoaded — it exposes document$, an
  // observable that emits on every real load *and* every instant
  // navigation, which is the supported hook for custom JS in that mode.
  if (window.document$) {
    document$.subscribe(init);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
