(function () {
  ["gesturestart", "gesturechange", "gestureend"].forEach((eventName) => {
    document.addEventListener(eventName, (event) => event.preventDefault());
  });

  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );
  document.addEventListener(
    "touchmove",
    (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
        return;
      }
      const dx = Math.abs(event.touches[0].clientX - touchStartX);
      const dy = Math.abs(event.touches[0].clientY - touchStartY);
      if (dx > dy) event.preventDefault();
    },
    { passive: false }
  );

  const site = window.SITE;
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  const themeColor = document.querySelector('meta[name="theme-color"]');

  function applyTheme(next) {
    if (next === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", next);
    if (themeColor) {
      themeColor.setAttribute("content", next === "light" ? "#eef0f8" : "#0b0b0d");
    }
  }

  if (savedTheme === "light") {
    applyTheme("light");
  }

  const fullName = `${site.firstName} ${site.lastName}`.trim();
  const logo = (site.lastName || site.firstName || "dev").slice(0, 8).toLowerCase();

  const page = document.body.dataset.page || "home";
  if (page === "about") {
    document.title = `About ${fullName}`;
  } else {
    document.title = `${fullName} — Software Developer`;
  }
  setText("[data-first]", site.firstName);
  setText("[data-last]", site.lastName);
  setText("[data-role]", site.role);
  setText("[data-tagline]", site.tagline);
  setText("[data-bio]", site.bio);
  setText("[data-availability]", site.availability);
  setText("[data-location]", site.location);
  setText("[data-logo]", logo);
  setText("[data-logo-foot]", logo);
  setText("[data-hourly]", `${site.currencySymbol}${site.hourlyRate}/hr`);
  setText("[data-hourly-note]", site.hourlyNote);
  setText("[data-rates-note]", site.ratesNote);

  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = `mailto:${site.email}`;
    emailLink.textContent = site.email;
  }

  const hireMessage = encodeURIComponent(
    "Hi Fabilous, I’d like to hire you for a software project."
  );
  const whatsappNumber = String(site.social.whatsapp || "").replace(/\D/g, "");
  const hireHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${hireMessage}`
    : "#contact";

  document.querySelectorAll(".js-hire").forEach((hire) => {
    hire.href = hireHref;
    if (whatsappNumber) {
      hire.target = "_blank";
      hire.rel = "noopener";
    }
  });

  document.querySelectorAll(".js-github").forEach((link) => {
    link.href = site.social.github;
  });

  const skillList = document.getElementById("skill-list");
  if (skillList) {
    skillList.innerHTML = site.skills.map((skill) => `<li>${escapeHtml(skill)}</li>`).join("");
  }

  const stackList = document.getElementById("stack-list");
  if (stackList) {
    stackList.innerHTML = site.stack.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  const socialLinks = [
    ["LinkedIn", site.social.linkedin, linkedinIcon(), "is-linkedin"],
    ["WhatsApp", hireHref.startsWith("http") ? hireHref : "", whatsappIcon(), "is-whatsapp"]
  ].filter(([, href]) => href);

  const socialHtml = socialLinks
    .map(
      ([label, href, icon, tone]) =>
        `<a class="social-link ${tone}" href="${escapeAttr(href)}" target="_blank" rel="noopener"><i aria-hidden="true">${icon}</i><span>${escapeHtml(label)}</span></a>`
    )
    .join("");

  document.querySelectorAll(".js-socials").forEach((row) => {
    row.innerHTML = socialHtml;
  });

  const projectGrid = document.getElementById("project-grid");
  if (projectGrid) {
    projectGrid.innerHTML = site.projects
      .map((project) => {
        const tags = project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
        const shot = project.image
          ? `<img class="project-shot" src="${escapeAttr(project.image)}" alt="${escapeHtml(project.title)} screenshot" width="800" height="500" loading="lazy" decoding="async" />`
          : "";
        const body = `
            ${shot}
            <div class="project-body">
              <p class="project-type">${escapeHtml(project.type)}</p>
              <h3>${escapeHtml(project.title)}</h3>
              <dl class="case-list">
                <div><dt>Problem</dt><dd>${escapeHtml(project.problem)}</dd></div>
                <div><dt>Built</dt><dd>${escapeHtml(project.built)}</dd></div>
                <div><dt>Result</dt><dd>${escapeHtml(project.result)}</dd></div>
              </dl>
              <div class="tags">${tags}</div>
              <span class="project-link">Visit site</span>
            </div>`;
        if (project.url) {
          return `<a class="project-card" href="${escapeAttr(project.url)}" target="_blank" rel="noopener">${body}</a>`;
        }
        return `<article class="project-card">${body}</article>`;
      })
      .join("");
  }

  const serviceGrid = document.getElementById("service-grid");
  if (serviceGrid && site.services) {
    serviceGrid.innerHTML = site.services
      .map(
        (service) => `
          <article class="service-card">
            <h3>${escapeHtml(service.title)}</h3>
            <p class="muted">${escapeHtml(service.text)}</p>
            <a class="project-link" href="index.html#contact">Request this</a>
          </article>`
      )
      .join("");
  }

  const rateGrid = document.getElementById("rate-grid");
  if (rateGrid) {
    rateGrid.innerHTML = site.packages
      .map(
        (pack) => `
          <article class="rate-card${pack.popular ? " popular" : ""}">
            ${pack.popular ? `<span class="popular-badge">Most booked</span>` : ""}
            <h3>${escapeHtml(pack.name)}</h3>
            <p class="rate-price">
              <span>${site.currencySymbol}${escapeHtml(pack.price)}</span>
              <small>${escapeHtml(pack.period)}</small>
            </p>
            <div class="rate-maintain">
              <div class="rate-maintain-copy">
                <span class="rate-maintain-label">Monthly maintenance</span>
                <span class="rate-maintain-note">Optional care after launch</span>
              </div>
              <strong class="rate-maintain-price">${site.currencySymbol}${escapeHtml(pack.maintenance)}<small>/mo</small></strong>
            </div>
            <p class="muted">${escapeHtml(pack.summary)}</p>
            <ul>${pack.features.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            <a class="btn ${pack.popular ? "btn-lime" : "btn-ghost"}" href="index.html#contact">Request ${escapeHtml(pack.name)}</a>
          </article>`
      )
      .join("");
  }

  const addonList = document.getElementById("addon-list");
  if (addonList) {
    addonList.innerHTML = site.addons
      .map(
        (addon) =>
          `<li><span>${escapeHtml(addon.name)}</span><strong>${site.currencySymbol}${escapeHtml(addon.price)}</strong></li>`
      )
      .join("");
  }

  if (site.about) {
    setText("[data-about-kicker]", site.about.kicker);
    setText("[data-about-headline]", site.about.headline);
    setText("[data-about-intro]", site.about.intro);

    const story = document.getElementById("about-story");
    if (story) {
      story.innerHTML = site.about.story.map((para) => `<p>${escapeHtml(para)}</p>`).join("");
    }

    const facts = document.getElementById("about-facts");
    if (facts) {
      facts.innerHTML = site.about.facts
        .map(
          (fact) =>
            `<article class="fact-card"><span>${escapeHtml(fact.label)}</span><strong>${escapeHtml(fact.value)}</strong></article>`
        )
        .join("");
    }

    const values = document.getElementById("about-values");
    if (values) {
      values.innerHTML = site.about.values
        .map(
          (value) =>
            `<article class="value-card"><h3>${escapeHtml(value.title)}</h3><p>${escapeHtml(value.text)}</p></article>`
        )
        .join("");
    }
  }

  document.getElementById("theme-toggle").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
  });

  const menuBtn = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const menuLabel = menuBtn.querySelector(".menu-btn-label");

  function closeMenu() {
    mobileNav.hidden = true;
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    if (menuLabel) menuLabel.textContent = "Menu";
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    mobileNav.hidden = false;
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Close menu");
    if (menuLabel) menuLabel.textContent = "Close";
    document.body.classList.add("menu-open");
  }

  menuBtn.addEventListener("click", () => {
    if (mobileNav.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 900) {
      closeMenu();
    }
  });

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const status = document.getElementById("form-status");
    const submitBtn = document.getElementById("form-submit");

    function showStatus(message, kind) {
      status.hidden = false;
      status.textContent = message;
      status.className = `form-status is-${kind}`;
    }

    function inquiryText(fields) {
      return [
        "Portfolio inquiry",
        "",
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Project: ${fields.package}`,
        "",
        fields.message
      ].join("\n");
    }

    function readFields() {
      const data = new FormData(contactForm);
      return {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        package: String(data.get("package") || "").trim(),
        message: String(data.get("message") || "").trim(),
        gotcha: String(data.get("_gotcha") || "").trim()
      };
    }

    function whatsappInquiryUrl(fields) {
      const text = encodeURIComponent(inquiryText(fields));
      return whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${text}` : "";
    }

    function postHidden(url, fields) {
      return new Promise((resolve) => {
        const iframe = document.createElement("iframe");
        const form = document.createElement("form");
        iframe.name = `mail-sink-${Date.now()}`;
        iframe.style.cssText = "position:absolute;width:0;height:0;border:0;overflow:hidden";
        form.method = "POST";
        form.action = url;
        form.target = iframe.name;
        Object.entries(fields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });
        document.body.append(iframe, form);
        const done = () => {
          form.remove();
          iframe.remove();
          resolve(true);
        };
        const timer = window.setTimeout(done, 2500);
        iframe.addEventListener(
          "load",
          () => {
            window.clearTimeout(timer);
            done();
          },
          { once: true }
        );
        form.submit();
      });
    }

    async function sendToGmail(fields) {
      const endpoint = String(site.formEndpoint || "").trim();
      if (!endpoint) return false;

      const payload = {
        name: fields.name,
        email: fields.email,
        package: fields.package,
        message: fields.message
      };

      try {
        const body = new FormData();
        Object.entries(payload).forEach(([key, value]) => body.set(key, value));
        const response = await fetch(endpoint, { method: "POST", body });
        const result = await response.json().catch(() => ({}));
        if (result.ok === false) {
          throw new Error(result.error || "Mail backend rejected the inquiry");
        }
        return true;
      } catch (error) {
        if (String(error.message || "").includes("rejected")) throw error;
        return postHidden(endpoint, payload);
      }
    }

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const fields = readFields();

      if (fields.gotcha) {
        showStatus("Sent. I’ll reply by email.", "ok");
        contactForm.reset();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      showStatus("Sending your inquiry…", "wait");

      try {
        if (site.formEndpoint) {
          await sendToGmail(fields);
          contactForm.reset();
          showStatus("Sent. I’ll reply to your email shortly.", "ok");
          return;
        }

        const waUrl = whatsappInquiryUrl(fields);
        if (waUrl) {
          window.open(waUrl, "_blank", "noopener");
          contactForm.reset();
          showStatus("WhatsApp should open with your inquiry. Tap Send and I’ll get it.", "ok");
          return;
        }

        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
          `Portfolio inquiry — ${fields.package}`
        )}&body=${encodeURIComponent(inquiryText(fields))}`;
        showStatus(`If your mail app didn’t open, email me at ${site.email}.`, "wait");
      } catch (error) {
        const waUrl = whatsappInquiryUrl(fields);
        if (waUrl) {
          window.open(waUrl, "_blank", "noopener");
          showStatus(
            "Email didn’t go through, so I opened WhatsApp with your inquiry. Tap Send there, or email me directly.",
            "err"
          );
        } else {
          showStatus(`Couldn’t send from the page. Email me at ${site.email}.`, "err");
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send inquiry";
      }
    });
  }

  function scrollToHash() {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }

  scrollToHash();
  window.addEventListener("load", scrollToHash);
  window.addEventListener("hashchange", scrollToHash);

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  function whatsappIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 11.5A8.5 8.5 0 0 1 7.4 18.7L4 20l1.4-3.3A8.5 8.5 0 1 1 20 11.5zm-8 6.7c.9 0 1.8-.2 2.6-.5l.3-.1 1.8.5-.5-1.7.1-.3A6.6 6.6 0 1 0 12 18.2zm3.6-4.4c.2.1.2.6 0 .9-.2.4-.7.6-1 .7-.5.2-1.6.5-3.2-.6a7 7 0 0 1-2.1-2.5c-.4-.7-.5-1.2-.3-1.6.1-.3.4-.4.6-.4h.5c.2 0 .3 0 .5.4l.6 1.4c.1.2 0 .3-.1.4l-.3.4c-.1.1-.2.3 0 .5a8 8 0 0 0 1.2 1.5c.5.4.9.6 1.1.4l.4-.3c.2-.1.3-.1.5 0l1.1.6c.2.1.3.2.4.3z"/></svg>`;
  }

  function githubIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.5.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z"/></svg>`;
  }

  function linkedinIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 9H4v11h2.5V9zM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4zM20 20v-6.2c0-3.3-1.8-4.8-4.1-4.8a3.5 3.5 0 0 0-3.2 1.7h-.1V9H10v11h2.6v-6c0-1.6.3-3.1 2.3-3.1s2 1.7 2 3.2V20H20z"/></svg>`;
  }

  function dribbbleIcon() {
    return `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 1 0 .1 20A10 10 0 0 0 12 2zm6.6 5.3a8 8 0 0 1 1.3 3.4 19 19 0 0 0-5.7-.2 29 29 0 0 0-1.6-3.7 8 8 0 0 1 6 0.5zM12 4a8 8 0 0 1 3.5.8 27 27 0 0 1-1.5 3.5 27 27 0 0 1-5.7-2.2A8 8 0 0 1 12 4zM6.2 6.8a29 29 0 0 0 6.3 2.3 29 29 0 0 1-.7 1.5A19 19 0 0 0 5 11.4 8 8 0 0 1 6.2 6.8zM4 12.1h.1a17 17 0 0 1 7.6-1 28 28 0 0 1-1.1 2.4A17 17 0 0 0 5.3 19 8 8 0 0 1 4 12.2zm3.4 7.3a15 15 0 0 1 5.1-5.2 28 28 0 0 0 1.6 4.3 8 8 0 0 1-6.7.9zm8.2-.3a30 30 0 0 1-1.8-4.7 17 17 0 0 1 5.3.4 8 8 0 0 1-3.5 4.3z"/></svg>`;
  }
})();
