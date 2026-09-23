const articles = [
  {
    category: 'Fundraising',
    slug: 'documents-behind-a-seed-round',
    title: 'The documents behind a seed round',
    summary: 'A visual guide to the agreements, approvals, and decisions that sit between a term sheet and a close.',
    cover: 'photo',
    outline: ['What each document does', 'Where terms travel between documents', 'Questions to settle before signing'],
  },
  {
    category: 'Starting up',
    slug: 'nda-is-a-starting-point',
    title: 'An NDA is a starting point. What comes next?',
    summary: 'The practical differences between sharing information and protecting the work that follows.',
    cover: 'red',
    outline: ['The scope of confidential information', 'Who can use it and for what', 'What happens when discussions end'],
  },
  {
    category: 'Commercial',
    slug: 'reading-a-master-services-agreement',
    title: 'Reading a master services agreement',
    summary: 'A plain-language map of the clauses that carry a long-term client relationship.',
    cover: 'ink',
    outline: ['Scope and statements of work', 'Risk allocation', 'Changes and termination'],
  },
  {
    category: 'People & IP',
    slug: 'hiring-your-first-engineer',
    title: 'Hiring your first engineer: the paperwork',
    summary: 'The agreements and ownership questions worth handling before the first line of code ships.',
    cover: 'line',
    outline: ['Employment terms', 'Inventions and ownership', 'Confidentiality and access'],
  },
  {
    category: 'Fundraising',
    slug: 'founders-guide-to-vesting',
    title: 'A founder’s guide to vesting',
    summary: 'How to read the timing and exit provisions behind a founder equity agreement.',
    cover: 'sand',
    outline: ['The vesting schedule', 'Cliffs and acceleration', 'Departures and repurchase rights'],
  },
  {
    category: 'Commercial',
    slug: 'the-contract-before-the-contract',
    title: 'The contract before the contract',
    summary: 'What a letter of intent can clarify before both sides spend time on a final agreement.',
    cover: 'photo2',
    outline: ['What is agreed in principle', 'Binding and non-binding sections', 'A path to final documents'],
  },
]

const glossaryCategories = ['All', 'Foundations', 'Fundraising', 'Commercial', 'People & IP']

const terms = [
  { term: 'Cap table', category: 'Fundraising', definition: 'A record of who owns a company and how that ownership is divided.', letter: 'C' },
  { term: 'Confidentiality', category: 'Foundations', definition: 'A duty to keep specified information private and use it only as agreed.', letter: 'C' },
  { term: 'ESOP', category: 'People & IP', definition: 'An employee stock option plan that sets out how eligible team members may receive options.', letter: 'E' },
  { term: 'Governing law', category: 'Foundations', definition: 'The law chosen to interpret an agreement and resolve questions about it.', letter: 'G' },
  { term: 'Indemnity', category: 'Commercial', definition: 'A promise to cover certain losses or claims described in a contract.', letter: 'I' },
  { term: 'Intellectual property assignment', category: 'People & IP', definition: 'A provision transferring specified rights in created work to another party.', letter: 'I' },
  { term: 'Limitation of liability', category: 'Commercial', definition: 'A clause that sets boundaries on the losses one party may recover from another.', letter: 'L' },
  { term: 'Master services agreement', category: 'Commercial', definition: 'A framework contract for an ongoing services relationship and its future work orders.', letter: 'M' },
  { term: 'Non-disclosure agreement', category: 'Foundations', definition: 'An agreement that sets rules for sharing and protecting confidential information.', letter: 'N' },
  { term: 'Representations and warranties', category: 'Fundraising', definition: 'Statements a party makes about facts or circumstances in a transaction.', letter: 'R' },
  { term: 'Shareholders’ agreement', category: 'Fundraising', definition: 'An agreement that sets out rights and obligations among a company’s shareholders.', letter: 'S' },
  { term: 'Vesting', category: 'People & IP', definition: 'The process by which a person earns rights to equity over time or after milestones.', letter: 'V' },
]

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
}

function openPreview(type, item) {
  const dialog = document.querySelector('#preview-dialog')
  if (!dialog) return
  const isArticle = type === 'article'
  dialog.innerHTML = `
    <div class="dialog-content">
      <div class="dialog-top"><span>LEXTRON / ${isArticle ? 'JOURNAL' : 'GLOSSARY'} / UI PREVIEW</span><button type="button" class="dialog-close" aria-label="Close preview">×</button></div>
      <p class="eyebrow eyebrow--dark">${escapeHTML(item.category)}</p>
      <h2 id="preview-title">${escapeHTML(isArticle ? item.title : item.term)}</h2>
      <p class="dialog-lede">${escapeHTML(isArticle ? item.summary : item.definition)}</p>
      ${isArticle ? `<div class="dialog-outline"><span class="dialog-outline-title">PROPOSED ARTICLE STRUCTURE</span>${item.outline.map((point, index) => `<div><b>0${index + 1}</b><span>${escapeHTML(point)}</span></div>`).join('')}</div>` : '<div class="dialog-outline"><span class="dialog-outline-title">ENTRY STRUCTURE</span><div><b>01</b><span>Plain-language meaning</span></div><div><b>02</b><span>Where you will see it</span></div><div><b>03</b><span>Questions to ask</span></div></div>'}
      <p class="dialog-note">This is a layout preview. The full ${isArticle ? 'article' : 'definition and source notes'} will be written and reviewed in the content pass.</p>
    </div>`
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close())
  dialog.showModal()
}

const dialog = document.querySelector('#preview-dialog')
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close()
})

function initBlog() {
  const grid = document.querySelector('#blog-grid')
  grid.innerHTML = articles.map((post) => `
    <a class="article-card" href="/blog/${post.slug}/">
      <span class="article-cover article-cover--${post.cover}" aria-hidden="true"></span>
      <span class="article-card-body">
        <strong>${escapeHTML(post.title)}</strong>
        <span class="article-summary">${escapeHTML(post.summary)}</span>
        <span class="article-meta">${escapeHTML(post.category)}</span>
      </span>
    </a>`).join('')
}

function initArticle() {
  const post = articles.find((entry) => entry.slug === document.body.dataset.slug)
  const root = document.querySelector('#article-root')
  if (!post || !root) return
  document.title = `${post.title} · Lextron`

  const readingNotes = [
    'The finished article will establish the business situation and explain why this part of the document matters. It will separate the decision the team can make from the points that need qualified legal review.',
    'A practical example will show how this issue appears in a real workflow: what the company provides, what the reviewer checks, and which questions should be resolved before the document is final.',
    'The final section will turn the discussion into questions a reader can take into their own matter. Examples, jurisdiction-specific detail, and sources will be added when the article is written.',
  ]
  const related = articles.filter((entry) => entry.slug !== post.slug).slice(0, 2)

  root.innerHTML = `
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <div class="shell header-inner">
        <a class="wordmark" href="/blog/" aria-label="Lextron home">Lextron</a>
        <nav class="primary-nav" aria-label="Primary"><a href="/blog/" aria-current="page">Journal</a><a href="/ai-glossary/">Glossary</a></nav>
        <a class="header-cta" href="https://app.lextronai.com/start">Start a document <span aria-hidden="true">↗</span></a>
      </div>
    </header>
    <main id="main" class="article-page">
      <div class="shell">
        <a class="article-back" href="/blog/"><span aria-hidden="true">←</span> Journal</a>
        <article>
          <header class="article-header">
            <p class="article-meta-line">${escapeHTML(post.category)}</p>
            <h1>${escapeHTML(post.title)}</h1>
            <p class="article-description">${escapeHTML(post.summary)}</p>
          </header>
          <div class="article-visual article-cover--${post.cover}" role="img" aria-label="Lextron editorial photograph"></div>
          <div class="article-prose">
            <p class="article-opening">${escapeHTML(post.summary)} The finished piece will use concrete examples and reviewed sources to make the choices behind the document easier to understand.</p>
            ${post.outline.map((heading, index) => `<section><h2>${escapeHTML(heading)}</h2><p>${escapeHTML(readingNotes[index])}</p></section>`).join('')}
          </div>
        </article>
        <aside class="related-posts" aria-labelledby="related-heading">
          <p class="eyebrow">KEEP READING</p>
          <h2 id="related-heading">More from Lextron</h2>
          <div>${related.map((entry) => `<a href="/blog/${entry.slug}/"><span>${escapeHTML(entry.category)}</span><strong>${escapeHTML(entry.title)}</strong></a>`).join('')}</div>
        </aside>
      </div>
    </main>
    <footer class="site-footer"><div class="shell footer-inner"><a class="wordmark" href="/blog/">Lextron</a><nav aria-label="Footer"><a href="/blog/">Journal</a><a href="/ai-glossary/">Glossary</a><a href="https://lextronai.com/">Main site ↗</a></nav><span>© 2026 Lextron</span></div></footer>`
}

function initGlossary() {
  const filters = document.querySelector('#glossary-filters')
  const input = document.querySelector('#glossary-search')
  const results = document.querySelector('#glossary-results')
  const count = document.querySelector('#result-count')
  const clear = document.querySelector('#clear-filters')
  let activeCategory = 'All'

  function render() {
    const query = input.value.trim().toLocaleLowerCase()
    const matches = terms.filter((item) => (activeCategory === 'All' || item.category === activeCategory) && `${item.term} ${item.category} ${item.definition}`.toLocaleLowerCase().includes(query))
    filters.innerHTML = glossaryCategories.map((category) => `<button type="button" data-category="${escapeHTML(category)}" class="topic-button ${category === activeCategory ? 'is-active' : ''}" aria-pressed="${category === activeCategory}">${escapeHTML(category)}</button>`).join('')
    count.textContent = `${matches.length} ${matches.length === 1 ? 'definition' : 'definitions'}`
    clear.hidden = !query && activeCategory === 'All'

    const groups = [...new Set(matches.map((item) => item.letter))]
    results.innerHTML = groups.length ? groups.map((letter) => `<section class="term-group" aria-labelledby="letter-${letter}"><h3 id="letter-${letter}" class="term-letter">${letter}</h3><div class="term-grid">${matches.filter((item) => item.letter === letter).map((item) => `<button type="button" class="term-card" data-term="${escapeHTML(item.term)}"><span class="term-category">${escapeHTML(item.category.toUpperCase())}</span><strong>${escapeHTML(item.term)}</strong><span class="term-definition">${escapeHTML(item.definition)}</span><span class="term-read">Preview entry</span></button>`).join('')}</div></section>`).join('') : '<div class="empty-state"><span class="eyebrow">NO MATCHES</span><h3>No term found.</h3><p>Try another phrase or clear the filters.</p><button type="button" data-clear-all>Clear filters</button></div>'
  }

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]')
    if (!button) return
    activeCategory = button.dataset.category
    render()
  })
  input.addEventListener('input', render)
  function clearFilters() { activeCategory = 'All'; input.value = ''; render(); input.focus() }
  clear.addEventListener('click', clearFilters)
  results.addEventListener('click', (event) => {
    if (event.target.closest('[data-clear-all]')) { clearFilters(); return }
    const button = event.target.closest('[data-term]')
    if (button) openPreview('term', terms.find((item) => item.term === button.dataset.term))
  })
  render()
}

if (document.body.dataset.page === 'blog') initBlog()
if (document.body.dataset.page === 'glossary') initGlossary()
if (document.body.dataset.page === 'article') initArticle()
