(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Nav scroll state ---------- */
  var navEl = document.querySelector("[data-nav]");
  if (navEl) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        navEl.classList.add("bg-charcoal/90", "backdrop-blur-md", "border-gold/10");
      } else {
        navEl.classList.remove("bg-charcoal/90", "backdrop-blur-md", "border-gold/10");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector("[data-mobile-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    var iconOpen = toggle.querySelector("[data-icon-open]");
    var iconClose = toggle.querySelector("[data-icon-close]");
    var setMenuOpen = function (open) {
      menu.setAttribute("data-open", String(open));
      toggle.setAttribute("aria-expanded", String(open));
      iconOpen.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
      document.body.classList.toggle("overflow-hidden", open);
    };
    toggle.addEventListener("click", function () {
      setMenuOpen(menu.getAttribute("data-open") !== "true");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.getAttribute("data-open") === "true") {
        setMenuOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- FAQ accordion (progressive enhancement) ----------
     Content is fully visible without JS. If JS runs, we switch panels
     into a collapsed state and wire up expand/collapse. */
  document.querySelectorAll("[data-faq-group]").forEach(function (group) {
    var items = group.querySelectorAll("[data-faq-item]");
    items.forEach(function (item, idx) {
      var trigger = item.querySelector("[data-faq-trigger]");
      var panel = item.querySelector("[data-faq-panel]");
      var icon = item.querySelector("[data-faq-icon]");
      panel.setAttribute("data-js-collapsed", "true");
      panel.setAttribute("data-open", idx === 0 ? "true" : "false");
      trigger.setAttribute("aria-expanded", idx === 0 ? "true" : "false");

      trigger.addEventListener("click", function () {
        var isOpen = panel.getAttribute("data-open") === "true";
        panel.setAttribute("data-open", String(!isOpen));
        trigger.setAttribute("aria-expanded", String(!isOpen));
        if (icon) {
          icon.style.transform = !isOpen ? "rotate(45deg)" : "rotate(0deg)";
        }
      });
    });
  });

  /* ---------- Industry Selector tabs (progressive enhancement) ----------
     Without JS, every industry panel is visible and fully readable (each
     with its own workflow diagram). With JS, we hide all but the first
     panel and wire up real tab switching, including left/right arrow
     keyboard navigation per standard tab-widget behavior. */
  document.querySelectorAll("[data-industry-selector]").forEach(function (selector) {
    var tabs = Array.prototype.slice.call(selector.querySelectorAll("[data-industry-tab]"));
    var panels = selector.querySelectorAll("[data-industry-panel]");
    if (!tabs.length) return;

    panels.forEach(function (panel, i) {
      panel.hidden = i !== 0;
    });

    function activate(id) {
      tabs.forEach(function (tab) {
        var isActive = tab.getAttribute("data-industry-tab") === id;
        tab.setAttribute("aria-selected", String(isActive));
        tab.classList.toggle("border-gold", isActive);
        tab.classList.toggle("bg-gold", isActive);
        tab.classList.toggle("text-charcoal", isActive);
        tab.classList.toggle("border-gold/20", !isActive);
        tab.classList.toggle("text-slate2", !isActive);
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-industry-panel") !== id;
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        activate(tab.getAttribute("data-industry-tab"));
        trackEvent("industry_tab_select", { industry: tab.getAttribute("data-industry-tab") });
      });
      tab.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        var next = e.key === "ArrowRight" ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
        tabs[next].focus();
        activate(tabs[next].getAttribute("data-industry-tab"));
      });
    });
  });

  /* ---------------------------------------------------------------------
     Scroll reveal (progressive enhancement, disabled entirely under
     prefers-reduced-motion). Content is fully visible without this —
     it only adds a fade+slide-up as sections/cards enter the viewport,
     and each element animates once. Content already in the initial
     viewport on load is left alone (no fade-in on first paint).
     --------------------------------------------------------------------- */
  var supportsIO = "IntersectionObserver" in window;

  if (!prefersReducedMotion && supportsIO) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    var isAboveFoldOnLoad = function (el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      if (isAboveFoldOnLoad(el)) return; // already visible — don't fade it
      el.classList.add("reveal-init");
      revealObserver.observe(el);
    });

    document.querySelectorAll("[data-reveal-group]").forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        if (isAboveFoldOnLoad(child)) return;
        child.classList.add("reveal-init");
        child.style.transitionDelay = Math.min(i * 70, 280) + "ms";
        revealObserver.observe(child);
      });
    });

    /* -------------------------------------------------------------------
       Signature automation effect (homepage hero workflow only). A gold
       signal moves through the workflow once as it enters the viewport;
       each stage resolves to a settled green "complete" state and stays
       there. Runs exactly once.
       ------------------------------------------------------------------- */
    var signatureEl = document.querySelector("[data-signature-workflow]");
    if (signatureEl) {
      var sigObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var nodes = entry.target.querySelectorAll("[data-workflow-node]");
              nodes.forEach(function (node, i) {
                setTimeout(function () {
                  node.setAttribute("data-signal", "active");
                  setTimeout(function () {
                    node.setAttribute("data-signal", "complete");
                  }, 260);
                }, i * 450);
              });
              sigObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      sigObserver.observe(signatureEl);
    }
  }

  /* ---------------------------------------------------------------------
     ROI / Lead-Recovery calculator (homepage only). The math itself lives
     in window.ROIFormulas.computeROI() (src/js/roi-formulas.js) — a pure,
     unit-tested function (see test-roi.js) — so this block only reads
     inputs, calls it, and paints the DOM. Nothing here re-derives or
     duplicates the formulas.
     --------------------------------------------------------------------- */
  var roiRoot = document.querySelector("[data-roi-calculator]");
  if (roiRoot && window.ROIFormulas) {
    var roiLeads = document.getElementById("roi-leads");
    var roiValue = document.getElementById("roi-value");
    var roiMissed = document.getElementById("roi-missed");
    var roiConversion = document.getElementById("roi-conversion");
    var roiRecovery = document.getElementById("roi-recovery");
    var roiAdminHours = document.getElementById("roi-admin-hours");
    var roiStaffCost = document.getElementById("roi-staff-cost");
    var roiAutomationCost = document.getElementById("roi-automation-cost");

    // Default the automation-cost field from the centralized pricing config
    // (see src/data/pricing-config.js) rather than hardcoding it here too.
    if (roiAutomationCost && window.PricingConfig && window.PricingConfig.automate) {
      roiAutomationCost.value = window.PricingConfig.automate.monthlyRecurring;
    }

    var roiLeadsOut = document.getElementById("roi-leads-out");
    var roiMissedOut = document.getElementById("roi-missed-out");
    var roiConversionOut = document.getElementById("roi-conversion-out");
    var roiRecoveryOut = document.getElementById("roi-recovery-out");

    var roiNetBenefitEl = document.getElementById("roi-net-benefit");
    var roiLeadsRecoveredEl = document.getElementById("roi-leads-recovered");
    var roiAdditionalRevenueEl = document.getElementById("roi-additional-revenue");
    var roiTimeSavedEl = document.getElementById("roi-time-saved");
    var roiLaborValueEl = document.getElementById("roi-labor-value");
    var roiMonthlyValueEl = document.getElementById("roi-monthly-value");
    var roiMonthlyCostEl = document.getElementById("roi-monthly-cost");
    var roiValueToCostEl = document.getElementById("roi-value-to-cost");
    var roiPercentEl = document.getElementById("roi-percent");

    var currency = function (n) {
      return "$" + Math.round(n).toLocaleString("en-US");
    };

    var roiStarted = false;
    var roiTouched = {};
    var roiCompleteFired = false;
    var roiInputEls = [
      roiLeads,
      roiValue,
      roiMissed,
      roiConversion,
      roiRecovery,
      roiAdminHours,
      roiStaffCost,
      roiAutomationCost,
    ];

    function pulse(el) {
      if (prefersReducedMotion || !el) return;
      el.style.transition = "transform 200ms ease";
      el.style.transform = "scale(1.035)";
      setTimeout(function () {
        el.style.transform = "scale(1)";
      }, 200);
    }

    function render() {
      var result = window.ROIFormulas.computeROI({
        monthlyLeads: parseFloat(roiLeads.value),
        avgCustomerValue: parseFloat(roiValue.value),
        missedPct: parseFloat(roiMissed.value),
        conversionPct: parseFloat(roiConversion.value),
        recoveryPct: parseFloat(roiRecovery.value),
        adminHoursSaved: parseFloat(roiAdminHours.value),
        staffHourlyCost: parseFloat(roiStaffCost.value),
        automationCost: parseFloat(roiAutomationCost.value),
      });

      roiLeadsOut.textContent = String(Math.round(result.inputs.monthlyLeads));
      roiMissedOut.textContent = result.inputs.missedPct + "%";
      roiConversionOut.textContent = result.inputs.conversionPct + "%";
      roiRecoveryOut.textContent = result.inputs.recoveryPct + "%";

      roiNetBenefitEl.textContent = currency(result.estimatedNetBenefit) + "/mo";
      roiLeadsRecoveredEl.textContent = Math.round(result.recoveredLeads).toLocaleString("en-US") + "/mo";
      roiAdditionalRevenueEl.textContent = currency(result.potentialAdditionalRevenue) + "/mo";
      roiTimeSavedEl.textContent = Math.round(result.inputs.adminHoursSaved).toLocaleString("en-US") + " hrs/mo";
      roiLaborValueEl.textContent = currency(result.laborSavingsValue) + "/mo";
      roiMonthlyValueEl.textContent = currency(result.estimatedMonthlyValue) + "/mo";
      roiMonthlyCostEl.textContent = currency(result.inputs.automationCost) + "/mo";
      roiValueToCostEl.textContent =
        result.valueToCostMultiple === null ? "\u2014" : result.valueToCostMultiple.toFixed(2) + "\u00d7";
      roiPercentEl.textContent = result.estimatedROI === null ? "\u2014" : Math.round(result.estimatedROI) + "%";

      document.querySelectorAll("[data-roi-result-card]").forEach(pulse);
    }

    roiInputEls.forEach(function (input) {
      if (!input) return;
      input.addEventListener("input", function () {
        if (!roiStarted) {
          roiStarted = true;
          trackEvent("roi_calculator_start");
        }
        roiTouched[input.id] = true;
        if (!roiCompleteFired && Object.keys(roiTouched).length >= 4) {
          roiCompleteFired = true;
          trackEvent("roi_calculator_complete");
        }
        render();
      });
    });

    var roiCtaEl = roiRoot.parentElement.querySelector("[data-roi-cta]");
    if (roiCtaEl) {
      roiCtaEl.addEventListener("click", function () {
        trackEvent("roi_to_contact");
      });
    }

    render(); // paint real numbers matching the default inputs on load
  }

  /* ---------------------------------------------------------------------
     Pricing → consultation category handoff (sessionStorage only, nothing
     sensitive, no query params). Clicking "Book a Consultation" from a
     /pricing/ box stores which category the visitor came from; the
     contact page shows a small note and, where the mapping is clear,
     suggests (never locks) a matching interest option.
     --------------------------------------------------------------------- */
  document.querySelectorAll("[data-consult-category]").forEach(function (el) {
    el.addEventListener("click", function () {
      try {
        sessionStorage.setItem("consultationCategory", el.getAttribute("data-consult-category"));
      } catch (e) {
        // sessionStorage unavailable — link still navigates normally.
      }
    });
  });

  var categoryNoteEl = document.querySelector("[data-consult-category-note]");
  var interestField = document.getElementById("interest");
  if (categoryNoteEl) {
    try {
      var category = sessionStorage.getItem("consultationCategory");
      if (category) {
        categoryNoteEl.textContent = "You're inquiring about: " + category;
        categoryNoteEl.classList.remove("hidden");
        var suggestion = { BUILD: "Website / Funnel", AUTOMATE: "AI Automation" }[category];
        if (suggestion && interestField) {
          interestField.value = suggestion; // suggested only — visitor can change it freely
        }
        sessionStorage.removeItem("consultationCategory");
      }
    } catch (e) {
      // sessionStorage unavailable — form still works normally, no note shown.
    }
  }

  /* ---------- Timezone auto-detect (contact page only) ----------
     Fills the field with the browser's detected timezone; always
     editable, never required to match. */
  var timezoneField = document.querySelector("[data-timezone-field]");
  if (timezoneField && !timezoneField.value) {
    try {
      timezoneField.value = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    } catch (e) {
      // Detection unavailable — field stays blank, visitor can type it in.
    }
  }

  /* ---------- Contact / consultation request form ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var statusEl = form.querySelector("[data-form-status]");
    var submitBtn = form.querySelector("[data-form-submit]");
    var originalBtnText = submitBtn.textContent;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: if filled, silently treat as success without submitting (bot trap).
      var honeypot = form.querySelector('[name="company_website_url"]');
      if (honeypot && honeypot.value) {
        showStatus("success");
        form.reset();
        return;
      }

      // Basic client-side validation (server re-validates authoritatively).
      var required = form.querySelectorAll("[required]");
      var valid = true;
      required.forEach(function (field) {
        var fieldValid = !!(field.value && field.value.trim());
        field.classList.toggle("border-red-400", !fieldValid);
        field.setAttribute("aria-invalid", String(!fieldValid));
        if (!fieldValid) valid = false;
      });
      var emailField = form.querySelector('[name="email"]');
      if (emailField) {
        var emailValid = /^\S+@\S+\.\S+$/.test(emailField.value);
        emailField.classList.toggle("border-red-400", !emailValid);
        emailField.setAttribute("aria-invalid", String(!emailValid));
        if (!emailValid) valid = false;
      }

      if (!valid) {
        showStatus("error", "Please fill in all required fields with a valid email.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending\u2026";

      // Netlify Forms expects a standard URL-encoded form POST (not JSON),
      // submitted to the page the form lives on. Field length is still
      // capped client-side as a courtesy; Netlify's own honeypot handling
      // (via netlify-honeypot on the <form>) backs up the client-side check
      // above.
      var formData = new FormData(form);
      var encoded = [];
      formData.forEach(function (value, key) {
        encoded.push(
          encodeURIComponent(key) + "=" + encodeURIComponent(String(value).slice(0, 2000))
        );
      });

      fetch("/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encoded.join("&"),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("submission_failed");
          showStatus("success");
          form.reset();
          trackEvent("contact_form_complete");
        })
        .catch(function () {
          // Recoverable error: keep entered values, show retry message.
          showStatus(
            "error",
            "Something went wrong sending your request. Your information hasn't been lost \u2014 please try again."
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });

    var startTracked = false;
    form.addEventListener(
      "input",
      function (e) {
        if (!startTracked) {
          startTracked = true;
          trackEvent("contact_form_start");
        }
        if (e.target && e.target.classList.contains("border-red-400")) {
          var stillEmpty = e.target.hasAttribute("required") && !e.target.value.trim();
          var isEmailField = e.target.name === "email";
          var stillInvalidEmail = isEmailField && !/^\S+@\S+\.\S+$/.test(e.target.value);
          if (!stillEmpty && !stillInvalidEmail) {
            e.target.classList.remove("border-red-400");
            e.target.setAttribute("aria-invalid", "false");
          }
        }
      },
      { once: false }
    );

    function showStatus(type, message) {
      if (!statusEl) return;
      statusEl.classList.remove("hidden", "text-emerald2", "text-red-400");
      if (type === "success") {
        statusEl.innerHTML =
          '<span class="inline-flex items-center gap-2">' +
          '<svg class="success-check w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>' +
          "<span>Thanks \u2014 your request was sent. We'll follow up shortly.</span>" +
          "</span>";
        statusEl.classList.add("text-emerald2");
        var check = statusEl.querySelector(".success-check");
        if (check) {
          // Force a frame so the entrance transition actually plays.
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              check.setAttribute("data-shown", "true");
            });
          });
        }
      } else {
        statusEl.textContent = message || "Something went wrong. Please try again.";
        statusEl.classList.add("text-red-400");
      }
      statusEl.setAttribute("role", "status");
      statusEl.focus && statusEl.focus();
    }
  }

  /* ---------- CTA click + nav-context analytics events ---------- */
  document.querySelectorAll("[data-cta]").forEach(function (el) {
    el.addEventListener("click", function () {
      trackEvent("cta_click", {
        label: el.getAttribute("data-cta"),
        page: window.location.pathname,
      });
    });
  });
  document.querySelectorAll("[data-nav-event]").forEach(function (el) {
    el.addEventListener("click", function () {
      trackEvent(el.getAttribute("data-nav-event"), { page: window.location.pathname });
    });
  });

  /* ---------------------------------------------------------------------
     2S Assistant — predefined decision-tree fallback, no external AI API.
     Every "fact" below (pricing figures, demo URLs, service names) mirrors
     what's already published elsewhere on the site — nothing invented here.

     Future extensibility: getNode() is the single seam where a real AI
     backend (Cloudflare Workers AI, another LLM API, a 2S/Bella backend)
     could later be substituted — swap its implementation for an async
     call and keep the rendering code below untouched. No API key belongs
     in this file regardless of backend.
     --------------------------------------------------------------------- */
  var assistantNodes = {
    root: {
      message: "Hi! I'm the 2S Assistant. What would you like to improve in your business?",
      options: [
        { label: "Get more leads", next: "leads" },
        { label: "Automate follow-up", next: "followup" },
        { label: "AI receptionist", next: "receptionist" },
        { label: "Build a website", next: "website" },
        { label: "Reduce admin work", next: "admin" },
        { label: "See pricing", next: "pricing" },
        { label: "Book a consultation", href: "/contact/" },
      ],
    },
    leads: {
      message:
        "2S helps capture and follow up with leads automatically \u2014 from missed calls to web forms \u2014 so fewer inquiries slip through.",
      options: [
        { label: "See lead automation", href: "/ai-automation-services/" },
        { label: "Book a consultation", href: "/contact/" },
        { label: "\u2190 Back to menu", next: "root" },
      ],
    },
    followup: {
      message:
        "We build automated follow-up sequences that keep leads moving instead of sitting untouched in an inbox.",
      options: [
        { label: "See how it works", href: "/#lead-automation" },
        { label: "Book a consultation", href: "/contact/" },
        { label: "\u2190 Back to menu", next: "root" },
      ],
    },
    receptionist: {
      message:
        "Our AI receptionist handles common questions and booking-related conversations. We have two live demos you can try right now.",
      options: [
        { label: "Try the Dental AI Demo", href: "https://2s-dental-ai-demo.vercel.app", external: true },
        { label: "Try the HR Intelligence Demo", href: "https://2s-hr-ai-interview.vercel.app", external: true },
        { label: "Book a consultation", href: "/contact/" },
        { label: "\u2190 Back to menu", next: "root" },
      ],
    },
    website: {
      message: "Websites and funnels are part of our Build package \u2014 modern, high-converting, and connected to the systems behind them.",
      options: [
        { label: "See pricing", next: "pricing" },
        { label: "Book a consultation", href: "/contact/" },
        { label: "\u2190 Back to menu", next: "root" },
      ],
    },
    admin: {
      message:
        "2S offers virtual assistance, customer support, and bookkeeping automation to take repetitive admin off your plate.",
      options: [
        { label: "See services", href: "/services/" },
        { label: "Book a consultation", href: "/contact/" },
        { label: "\u2190 Back to menu", next: "root" },
      ],
    },
    pricing: {
      message: (function () {
        var pc = window.PricingConfig;
        if (!pc) {
          return "See the Pricing page for our current published rates.";
        }
        return (
          "2S pricing is organized into three categories: " +
          pc.build.label + " (" + pc.build.startingPriceText.toLowerCase() + "), " +
          pc.automate.label + " (" + pc.automate.startingPriceText.toLowerCase() + "), and " +
          pc.supportScale.label + " (" + pc.supportScale.startingPriceText.toLowerCase() + ")."
        );
      })(),
      options: [
        { label: "View pricing page", href: "/pricing/" },
        { label: "Book a consultation", href: "/contact/" },
        { label: "\u2190 Back to menu", next: "root" },
      ],
    },
  };

  function getNode(id) {
    return assistantNodes[id] || assistantNodes.root;
  }

  var assistantRoot = document.querySelector("[data-assistant]");
  if (assistantRoot) {
    var toggle = assistantRoot.querySelector("[data-assistant-toggle]");
    var panel = assistantRoot.querySelector("[data-assistant-panel]");
    var closeBtn = assistantRoot.querySelector("[data-assistant-close]");
    var thread = assistantRoot.querySelector("[data-assistant-thread]");
    var optionsEl = assistantRoot.querySelector("[data-assistant-options]");
    var started = false;

    function renderNode(id) {
      var node = getNode(id);
      var bubble = document.createElement("div");
      bubble.className = "assistant-bubble";
      bubble.textContent = node.message;
      thread.appendChild(bubble);
      thread.scrollTop = thread.scrollHeight;

      optionsEl.innerHTML = "";
      node.options.forEach(function (opt) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "assistant-option";
        btn.textContent = opt.label;
        btn.addEventListener("click", function () {
          trackEvent("assistant_option_select", { option: opt.label });
          if (opt.href) {
            if (opt.external) {
              window.open(opt.href, "_blank", "noopener,noreferrer");
            } else {
              window.location.href = opt.href;
            }
            return;
          }
          renderNode(opt.next);
        });
        optionsEl.appendChild(btn);
      });
    }

    function openPanel() {
      panel.setAttribute("data-open", "true");
      toggle.setAttribute("aria-expanded", "true");
      if (!started) {
        started = true;
        renderNode("root");
        trackEvent("assistant_open");
      }
      var firstOption = optionsEl.querySelector("button");
      if (firstOption) firstOption.focus();
    }

    function closePanel() {
      panel.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }

    toggle.addEventListener("click", function () {
      var isOpen = panel.getAttribute("data-open") === "true";
      if (isOpen) closePanel();
      else openPanel();
    });
    closeBtn.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.getAttribute("data-open") === "true") {
        closePanel();
      }
    });
  }

  function trackEvent(name, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params || {});
    }
  }
})();
