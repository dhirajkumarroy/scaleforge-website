const fs = require('fs');

const file = 'store.html';
let content = fs.readFileSync(file, 'utf-8');

// Replace Hero Sub Text
content = content.replace(
  /<p class="store-sub fade-in fd3">[\s\S]*?<\/p>/,
  `<p class="store-sub fade-in fd3">
        Professional business websites and automation systems built for growth.
        Every solution includes a fully functional setup and continuous WhatsApp support.
      </p>`
);

// Replace Trust Row
content = content.replace(
  /<div class="store-trust-row fade-in fd4">[\s\S]*?<\/div>/,
  `<div class="store-trust-row fade-in fd4">
        <div class="str-item"><i class="fa-solid fa-gem"></i> Premium Design</div>
        <div class="str-sep"></div>
        <div class="str-item"><i class="fa-solid fa-mobile-screen"></i> Mobile Optimized</div>
        <div class="str-sep"></div>
        <div class="str-item"><i class="fa-brands fa-whatsapp"></i> WhatsApp Integration</div>
        <div class="str-sep"></div>
        <div class="str-item"><i class="fa-solid fa-bolt"></i> Fast Delivery</div>
      </div>`
);

// Replace Filter Buttons
content = content.replace(
  /<div class="filter-btns">[\s\S]*?<\/div>/,
  `<div class="filter-btns">
        <button class="fbtn fbtn--active" data-filter="all">All Solutions</button>
        <button class="fbtn" data-filter="education">Education</button>
        <button class="fbtn" data-filter="business">Business</button>
        <button class="fbtn" data-filter="portfolio">Portfolio</button>
        <button class="fbtn" data-filter="automation">Automation</button>
      </div>`
);

// Replace Products Grid Inner
const productsGridStart = '<div class="products-grid" id="productsGrid">';
const productsGridEnd = '</div><!-- /products-grid -->';
const startIndex = content.indexOf(productsGridStart);
const endIndex = content.indexOf(productsGridEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const newProducts = `
        <!-- ── Product 1: Coaching Website ── -->
        <div class="product-card reveal" data-category="education">
          <div class="pc-top">
            <div class="pc-icon pc-icon--indigo">
              <i class="fa-solid fa-graduation-cap"></i>
            </div>
          </div>
          <h3 class="pc-title">Coaching Institute System</h3>
          <p class="pc-desc">A complete website to showcase courses, batches, and collect student enquiries automatically.</p>

          <ul class="pc-features">
            <li><i class="fa-solid fa-circle-check"></i> Show courses &amp; fees clearly</li>
            <li><i class="fa-solid fa-circle-check"></i> Capture student enquiries</li>
            <li><i class="fa-solid fa-circle-check"></i> WhatsApp integration</li>
            <li><i class="fa-solid fa-circle-check"></i> Mobile-friendly design</li>
          </ul>

          <div class="pc-pricing" style="border-top: none; padding-top: 0; padding-bottom: 24px;">
            <div class="pc-price">
              <span class="price-curr" style="font-size: 1.15rem; color: var(--text-2);">Starting from ₹8,000</span>
            </div>
          </div>

          <div class="pc-actions">
            <a href="https://wa.me/917889074622?text=Hi%20I%20am%20interested%20in%20the%20Coaching%20Institute%20System" 
               target="_blank" class="btn btn--primary btn--full">
              💬 Get Started on WhatsApp
            </a>
            <a href="/preview?project=p6" class="btn btn--outline btn--full btn--sm" target="_blank">
              🔍 View Demo
            </a>
          </div>
        </div>

        <!-- ── Product 2: Gym Website ── -->
        <div class="product-card reveal rd1" data-category="business">
          <div class="pc-top">
            <div class="pc-icon pc-icon--amber">
              <i class="fa-solid fa-dumbbell"></i>
            </div>
          </div>
          <h3 class="pc-title">Gym &amp; Fitness Website</h3>
          <p class="pc-desc">A modern website for gyms to manage memberships, plans, and client enquiries.</p>

          <ul class="pc-features">
            <li><i class="fa-solid fa-circle-check"></i> Membership plans display</li>
            <li><i class="fa-solid fa-circle-check"></i> Lead capture system</li>
            <li><i class="fa-solid fa-circle-check"></i> WhatsApp integration</li>
            <li><i class="fa-solid fa-circle-check"></i> Strong branding UI</li>
          </ul>

          <div class="pc-pricing" style="border-top: none; padding-top: 0; padding-bottom: 24px;">
            <div class="pc-price">
              <span class="price-curr" style="font-size: 1.15rem; color: var(--text-2);">Starting from ₹7,000</span>
            </div>
          </div>

          <div class="pc-actions">
            <a href="https://wa.me/917889074622?text=Hi%20I%20am%20interested%20in%20the%20Gym%20and%20Fitness%20Website" 
               target="_blank" class="btn btn--primary btn--full">
              💬 Get Started on WhatsApp
            </a>
            <a href="/preview?project=p1" class="btn btn--outline btn--full btn--sm" target="_blank">
              🔍 View Demo
            </a>
          </div>
        </div>

        <!-- ── Product 3: Library Website ── -->
        <div class="product-card reveal rd2" data-category="education business">
          <div class="pc-top">
            <div class="pc-icon pc-icon--teal">
              <i class="fa-solid fa-book-open"></i>
            </div>
          </div>
          <h3 class="pc-title">Library Management Website</h3>
          <p class="pc-desc">A simple system to manage members, book listings, and enquiries online.</p>

          <ul class="pc-features">
            <li><i class="fa-solid fa-circle-check"></i> Member info system</li>
            <li><i class="fa-solid fa-circle-check"></i> Book catalog display</li>
            <li><i class="fa-solid fa-circle-check"></i> Easy management</li>
            <li><i class="fa-solid fa-circle-check"></i> Clean interface</li>
          </ul>

          <div class="pc-pricing" style="border-top: none; padding-top: 0; padding-bottom: 24px;">
            <div class="pc-price">
              <span class="price-curr" style="font-size: 1.15rem; color: var(--text-2);">Starting from ₹6,000</span>
            </div>
          </div>

          <div class="pc-actions">
            <a href="https://wa.me/917889074622?text=Hi%20I%20am%20interested%20in%20the%20Library%20Management%20Website" 
               target="_blank" class="btn btn--primary btn--full">
              💬 Get Started on WhatsApp
            </a>
            <a href="/preview?project=p1" class="btn btn--outline btn--full btn--sm" target="_blank">
              🔍 View Demo
            </a>
          </div>
        </div>

        <!-- ── Product 4: Portfolio Website ── -->
        <div class="product-card reveal" data-category="portfolio">
          <div class="pc-top">
            <div class="pc-icon pc-icon--violet">
              <i class="fa-solid fa-user-tie"></i>
            </div>
          </div>
          <h3 class="pc-title">Personal Portfolio Website</h3>
          <p class="pc-desc">A professional personal website to showcase your skills, projects, and contact details.</p>

          <ul class="pc-features">
            <li><i class="fa-solid fa-circle-check"></i> Clean modern design</li>
            <li><i class="fa-solid fa-circle-check"></i> Fast loading</li>
            <li><i class="fa-solid fa-circle-check"></i> Mobile optimized</li>
            <li><i class="fa-solid fa-circle-check"></i> Great for jobs/freelancing</li>
          </ul>

          <div class="pc-pricing" style="border-top: none; padding-top: 0; padding-bottom: 24px;">
            <div class="pc-price">
              <span class="price-curr" style="font-size: 1.15rem; color: var(--text-2);">Starting from ₹4,000</span>
            </div>
          </div>

          <div class="pc-actions">
            <a href="https://wa.me/917889074622?text=Hi%20I%20am%20interested%20in%20the%20Personal%20Portfolio%20Website" 
               target="_blank" class="btn btn--primary btn--full">
              💬 Get Started on WhatsApp
            </a>
            <a href="/preview?project=p1" class="btn btn--outline btn--full btn--sm" target="_blank">
              🔍 View Demo
            </a>
          </div>
        </div>

        <!-- ── Product 5: WhatsApp Automation ── -->
        <div class="product-card reveal rd1" data-category="automation business">
          <div class="pc-top">
            <div class="pc-badge pc-badge--popular">
              <i class="fa-solid fa-fire"></i> Hot
            </div>
            <div class="pc-icon pc-icon--teal" style="background: rgba(37, 211, 102, 0.1); color: #25D366;">
              <i class="fa-brands fa-whatsapp"></i>
            </div>
          </div>
          <h3 class="pc-title">WhatsApp Automation System</h3>
          <p class="pc-desc">Automate replies, capture leads, and manage customer communication efficiently.</p>

          <ul class="pc-features">
            <li><i class="fa-solid fa-circle-check"></i> Auto-reply system</li>
            <li><i class="fa-solid fa-circle-check"></i> Lead capture</li>
            <li><i class="fa-solid fa-circle-check"></i> Follow-up automation</li>
            <li><i class="fa-solid fa-circle-check"></i> Business workflow improvement</li>
          </ul>

          <div class="pc-pricing" style="border-top: none; padding-top: 0; padding-bottom: 24px;">
            <div class="pc-price">
              <span class="price-curr" style="font-size: 1.15rem; color: var(--text-2);">Starting from ₹3,000 setup + monthly</span>
            </div>
          </div>

          <div class="pc-actions">
            <a href="https://wa.me/917889074622?text=Hi%20I%20am%20interested%20in%20the%20WhatsApp%20Automation%20System" 
               target="_blank" class="btn btn--primary btn--full">
              💬 Get Started on WhatsApp
            </a>
            <a href="/preview?project=p2" class="btn btn--outline btn--full btn--sm" target="_blank">
              🔍 View Demo
            </a>
          </div>
        </div>

      `;
  
  content = content.substring(0, startIndex + productsGridStart.length) + '\n' + newProducts + '\n' + content.substring(endIndex);
}

fs.writeFileSync(file, content);
console.log("Replaced successfully!");
