// progress bar
  const progress = document.getElementById('progress');
  function onScroll(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
    document.getElementById('nav').classList.toggle('scrolled', h.scrollTop > 10);
  }
  document.addEventListener('scroll', onScroll);
  onScroll();

  // hamburger
  const hamburger = document.getElementById('hamburger');
  const mobilemenu = document.getElementById('mobilemenu');
  hamburger.addEventListener('click', ()=>{
    hamburger.classList.toggle('open');
    mobilemenu.classList.toggle('open');
  });
  mobilemenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    hamburger.classList.remove('open'); mobilemenu.classList.remove('open');
  }));

  // active nav link on scroll
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.navlinks a');
  const navObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navLinks.forEach(l=>l.classList.toggle('active', l.getAttribute('href') === '#'+id));
      }
    });
  }, {rootMargin:'-45% 0px -45% 0px'});
  sections.forEach(s=>navObserver.observe(s));

  // reveal on scroll
  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  // animated stat counters
  const counters = document.querySelectorAll('.num[data-count]');
  const countObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'),10);
        const prefix = el.getAttribute('data-prefix')||'';
        const suffix = el.getAttribute('data-suffix')||'';
        let cur = 0;
        const dur = 1400;
        const start = performance.now();
        function tick(now){
          const p = Math.min((now-start)/dur,1);
          const eased = 1 - Math.pow(1-p,3);
          cur = Math.floor(eased*target);
          el.textContent = prefix + cur + suffix;
          if(p<1) requestAnimationFrame(tick);
          else el.textContent = prefix + target + suffix;
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      }
    });
  }, {threshold:0.4});
  counters.forEach(c=>countObserver.observe(c));

  // skill bars
  const bars = document.querySelectorAll('.bar span[data-w]');
  const barObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.width = entry.target.getAttribute('data-w')+'%';
        barObserver.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  bars.forEach(b=>barObserver.observe(b));

  // timeline dot activation
  const tlItems = document.querySelectorAll('.tl-item');
  const tlObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('in');
    });
  }, {threshold:0.4});
  tlItems.forEach(t=>tlObserver.observe(t));

  // resume buttons (placeholder — no file attached)
  document.querySelectorAll('.resume-link').forEach(el=>{
    el.addEventListener('click',(e)=>{e.preventDefault(); alert('Add your resume PDF link here.');});
  });

  // contact form (static page — no backend)
  document.getElementById('contactForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('This is a static preview — connect a form service (e.g. Formspree) to receive messages.');
  });

  // scroll to top
  document.getElementById('totop').addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // ---- custom cursor ----
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if(!isTouch){
    document.body.classList.add('has-cursor');
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const ringLabel = ring.querySelector('span');
    let mx=window.innerWidth/2, my=window.innerHeight/2, rx=mx, ry=my;
    document.addEventListener('mousemove', (e)=>{
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    function ringLoop(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(ringLoop);
    }
    ringLoop();

    const growTargets = document.querySelectorAll('a, button, .btn, .hero-fab, .hero-arrow-btn, input, textarea, .project-card:not(.placeholder), .cert-card, .lead-card');
    growTargets.forEach(el=>{
      const label = el.getAttribute('data-cursor-label');
      el.addEventListener('mouseenter', ()=>{
        ring.classList.add('grow');
        ringLabel.textContent = label || '';
      });
      el.addEventListener('mouseleave', ()=>{
        ring.classList.remove('grow');
        ringLabel.textContent = '';
      });
    });

    // magnetic buttons
    document.querySelectorAll('.magnetic').forEach(el=>{
      el.addEventListener('mousemove', (e)=>{
        const r = el.getBoundingClientRect();
        const relX = e.clientX - r.left - r.width/2;
        const relY = e.clientY - r.top - r.height/2;
        el.style.transform = `translate(${relX*0.25}px, ${relY*0.3}px)`;
      });
      el.addEventListener('mouseleave', ()=>{
        el.style.transform = 'translate(0,0)';
      });
    });

    // spotlight cards
    document.querySelectorAll('.project-card, .cert-card, .lead-card, .stat, .contact-side').forEach(el=>{
      el.addEventListener('mousemove', (e)=>{
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX-r.left)+'px');
        el.style.setProperty('--my', (e.clientY-r.top)+'px');
      });
    });
  }
