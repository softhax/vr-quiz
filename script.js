/* global AFRAME, THREE */
if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
  }
  
  // AFRAME.registerComponent('basic-interactions', {
  //   init: function() {
  //     var el = this.el;
  
  //     el.addEventListener('mouseenter', function() {
  //       el.setAttribute('material', 'color', '#00ff00');
  //     });
  //     el.addEventListener('mouseleave', function() {
  //       el.setAttribute('material', 'color', '#ff0000');
  //     });
  
  //     // TRIGGER BUTTON DOWN
  //     el.addEventListener('mousedown', function() {
  //       el.setAttribute('material', 'color', '#FFAA00');
  //     });
  //     // TRIGGER BUTTON UP
  //     el.addEventListener('mouseup', function() {
  //       el.setAttribute('material', 'color', '#AA0000');
  //     });
  //   }
  // });
    console.log("Anurag : ",window.location);
    var m1q1answer = '',
        m1q2answer = '',
        m1q3answer = '', firstSubmitted = false, secondSubmitted = false, thirdSubmitted = false,
        m1count = 0, m1q1correct, m1q2correct, m1q3correct;
  
  let canOpenLesson = true;
  if (window.location.href.includes('lesson')) canOpenLesson = false;
  
  if (window.location.href.includes('1')) {
    m1q1correct = "Linear" //answers of first quiz
    m1q2correct = "Two"
    m1q3correct = "180"
    } else if (window.location.href.includes('2')) {
      
    m1q1correct = "Glucose and Glucose"  //answers of second quiz
    m1q2correct = "alpha-1-4"
    m1q3correct = "oligosaccharides"
    } else if (window.location.href.includes('3_deleted')) {
    m1q1correct = "Option 3" 
    m1q2correct = "Option 2"
    m1q3correct = "Option 3"
    } else if (window.location.href.includes('3')) {
    m1q1correct = "Nucleus" //answer to third quiz
    m1q2correct = "Cytoplasm"
    m1q3correct = "Irregular Oval"
    } else if (window.location.href.includes('4')) {
    m1q1correct = "Wankhede" //answers to fourth quiz
    m1q2correct = "2011"
    m1q3correct = "33,000"
    } else {
    m1q1correct = "One"
    m1q2correct = "Two"
    m1q3correct = "Three"
    }
  
  
    var goToM2 = function(a) {
      if (window.location.href.includes('1')) {
    window.location.href="/lesson2.html"
    } else if (window.location.href.includes('2')) {
      
    window.location.href="/lesson3.html"
    } else if (window.location.href.includes('3')) {
    window.location.href="/lesson4.html"
    } else if (window.location.href.includes('4')) {
    window.location.href="/index.html"
    } else if (window.location.href.includes('5')) {
    
    } else {
    window.location.href="/lesson2.html"
    }
  //     console.log("Loading M2");
  // //  molecule1.setAttribute('scale','0.001 0.001 0.001');
  // //  molecule2.setAttribute('scale','1 1 1');    
  // let molecule1 = document.getElementById("m1"), molecule2 = document.getElementById("m2");
    
  // // you can animate the switch of the molecules like this
  //     molecule1.setAttribute('animation','property: scale; from:1 1 1; to:0.001 0.001 0.001; dur: 750; easing: easeInQuad');
  //     molecule2.setAttribute('animation','property: scale; from:0.001 0.001 0.001; to:1 1 1; dur: 750; easing: easeInQuad');
    }  
  
  var genericListener = (a) => {
    console.log('Generic listener')
    let source = a.path.find(item => item.tagName.toLowerCase() === 'a-gui-radio');
    var thisId = source.id;
    var thisToggle = document.getElementById(thisId);
    var thisToggleComponent = thisToggle.components['gui-radio'];
    if (!thisToggleComponent) thisToggleComponent = thisToggle;
    var thisToggleComponentChecked = thisToggleComponent.data.checked;
    
    let idComps = thisId.split('-');
    let otherBtn1 = document.getElementById(idComps[0] + '-' + idComps[1] + '-a1'),
        otherBtn2 = document.getElementById(idComps[0] + '-' + idComps[1] + '-a2'),
        otherBtn3 = document.getElementById(idComps[0] + '-' + idComps[1] + '-a3');
    let nextBtn = document.getElementById(idComps[0] + '-' + idComps[1] + '-next');
    let answer = thisToggle.getAttribute('value');
    if (thisToggleComponentChecked) {
      nextBtn.setAttribute('scale', '1 1 1');
      console.log('Next btn scaled up')
      if (idComps[0] === 'm1')  {
        if (idComps[1] === 'q1') m1q1answer = answer;
        else if (idComps[1] === 'q2') m1q2answer = answer;
        else m1q3answer = answer;
      }
      if (otherBtn1.components['gui-radio'].data.checked && otherBtn1.id !== thisId) otherBtn1.emit('click');
      if (otherBtn2.components['gui-radio'].data.checked && otherBtn2.id !== thisId) otherBtn2.emit('click');
      if (otherBtn3.components['gui-radio'].data.checked && otherBtn3.id !== thisId) otherBtn3.emit('click');
    } else {
      if (!(otherBtn1.components['gui-radio'].data.checked || otherBtn2.components['gui-radio'].data.checked
           || otherBtn3.components['gui-radio'].data.checked)) {
      nextBtn.setAttribute('scale', '0.01 0.01 0.01');
      console.log('Next button scaled down')
      }
    }
  }
  
  let quizOver = () => {
    canOpenLesson = true;
    document.getElementById('warning').setAttribute('scale', '0 0 0');
  }
  
  var nextListener = (a) => {
    let btn = a.path.find(item => item.tagName.toLowerCase() === 'a-gui-button');
    let molecule1 = document.getElementById("m1");
    let blackBar = document.getElementById('black-bar').getAttribute('width') || 1.8;
    let blueBar = document.getElementById('blue-bar');
    let pos1 = -0.8, increment = 0.575, posY = -0.15, posZ = 0.06, width, posX;
    switch (btn.id) {
      case 'm1-q1-next': if (firstSubmitted) break;
        m1q1correct === m1q1answer ? m1count++ : null;
      molecule1.setAttribute('animation','property: rotation; from:0 -28 0; to: 0 -118 0; dur: 750; easing: easeInQuad');
        document.getElementById('page2ind_circle').setAttribute('color', '#14ffec');
        width = increment;
        posX = (width + pos1 * 2) / 2;
        blueBar.setAttribute('width', width);
        blueBar.setAttribute('position', `${posX} ${posY} ${posZ}`);
        firstSubmitted = true;
        
        break;
      case 'm1-q2-next': if (secondSubmitted) break;
        m1q2correct === m1q2answer ? m1count++ : null;
      molecule1.setAttribute('animation','property: rotation; from:0 -118 0; to: 0 -208 0; dur: 750; easing: easeInQuad');
        document.getElementById('page3ind_circle').setAttribute('color', '#14ffec');
        width = increment * 2;
        posX = (width + pos1 * 2) / 2;
        blueBar.setAttribute('width', width);
        blueBar.setAttribute('position', `${posX} ${posY} ${posZ}`);
        secondSubmitted = true;
        break;
      case 'm1-q3-next': if (thirdSubmitted) break;
        m1q3correct === m1q3answer ? m1count++ : null;
        molecule1.setAttribute('animation','property: rotation; from:0 -208 0; to: 0 -298 0; dur: 750; easing: easeInQuad');
        document.getElementById('page4ind_circle').setAttribute('color', '#14ffec');
        width = increment * 3;
        posX = (width + pos1 * 2) / 2;
        
        blueBar.setAttribute('width', width);
        blueBar.setAttribute('position', `${posX} ${posY} ${posZ}`);
        let m1counttext = document.getElementById("m1-count"),
            m1nextquiz = document.getElementById("m1-next-quiz");
        // show count of correct answers
        m1counttext.setAttribute('text','value:'+m1count+' of 3 correct answers');
  
        //show the "next molecule" button
        m1nextquiz.setAttribute('animation','property: scale; from:0.001 0.001 0.001; to:1 1 1; dur: 750; easing: easeInQuad');
        thirdSubmitted = true;
        quizOver();
        
      
        break;
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const leftBtn = document.querySelector('#left-rotate-btn'), rightBtn = document.querySelector('#right-rotate-btn'),
          stopBtn = document.querySelector('#stop-rotate-btn');
    const atom = document.querySelector('#atom');
    const start = document.querySelector('#start'), lesson1 = document.querySelector("#lesson1"), lesson2 = document.querySelector("#lesson2"),
          lesson3 = document.querySelector("#lesson3"), lesson4 = document.querySelector("#lesson4"), lab1 = document.querySelector('#lab1'),
          lab2 = document.querySelector('#lab2'), lab3 = document.querySelector('#lab3'), lab4 = document.querySelector('#lab4');
    const closePopup = document.querySelector('#close-popup');
    const popup = document.querySelector('#popup');
    const molecule = document.querySelector('#molecule'), mole = document.querySelector('#mole');
    const closeWarning = document.querySelector('#close-warning');
    
    if (closeWarning) closeWarning.addEventListener('click', function(e) {
      document.getElementById('warning').setAttribute('scale', '0 0 0');
    });
        let x = 0, y = 0, z = 0;
   // mole.setAttribute('animation', `property: rotation; from:${x} ${y} ${z}; to: ${x+360} ${y} ${z}; loop: true; dur: 3000; easing: linear`)
  // mole.setAttribute('animation', `property: rotation; from:${x} ${y} ${z}; to: ${x} ${y+90} ${z}; dur: 3000; easing: linear`)
      
    const emitEvent = (eventName, listeners) => {
       listeners.forEach((listener) => {
          const el = document.querySelector(listener);
             el.emit(eventName);
       })
    };
    
    if (start) start.addEventListener('click', function(e) {
      window.location.href = '/menu.html';
    });
    // hiding labels
    if (window.location.href.includes('lesson')) {
      if (window.location.href.includes('1')) {
        if (lesson1) lesson1.setAttribute('scale', '0 0 0');
        if (lab1) lab1.setAttribute('scale', '0 0 0');
      }
      if (window.location.href.includes('2')) {
        if (lesson2) lesson2.setAttribute('scale', '0 0 0');
        if (lab2) lab2.setAttribute('scale', '0 0 0');
      }
      if (window.location.href.includes('3')) {
        if (lesson3) lesson3.setAttribute('scale', '0 0 0');
        if (lab3) lab3.setAttribute('scale', '0 0 0');
      }
      if (window.location.href.includes('4')) {
        if (lesson4) lesson4.setAttribute('scale', '0 0 0');
        if (lab4) lab4.setAttribute('scale', '0 0 0');
      }
    }
    
    if (lesson1) lesson1.addEventListener('click', function(e) {
      console.log('Clicking lesson 1.')
      if (canOpenLesson) {
        // document.getElementById('lesson1-link').click();
        window.location.href = '/lesson1.html';
      }
      else document.getElementById('warning').setAttribute('scale', '1 1 1');
    })
    if (lesson2) lesson2.addEventListener('click', function(e) { 
      if (canOpenLesson) {
        // document.getElementById('lesson2-link').click();
        window.location.href = '/lesson2.html';
      }
      else document.getElementById('warning').setAttribute('scale', '1 1 1');
    })
    if (lesson3) lesson3.addEventListener('click', function(e) { 
      if (canOpenLesson) {
        // document.getElementById('lesson3-link').click();
        window.location.href = '/lesson3.html';
      }
      else document.getElementById('warning').setAttribute('scale', '1 1 1');
    })
    if (lesson4) lesson4.addEventListener('click', function(e) { 
      if (canOpenLesson) {
        // document.getElementById('lesson4-link').click();
        window.location.href = '/lesson4.html';
      }
      else document.getElementById('warning').setAttribute('scale', '1 1 1');
    })
    
    
    if (lab1) lab1.addEventListener('click', function(e) { 
      if (canOpenLesson) {
        // document.getElementById('lesson1-link').click();
        window.location.href = '/lesson1.html';
      }
      else document.getElementById('warning').setAttribute('scale', '1 1 1');
    })
    if (lab2) lab2.addEventListener('click', function(e) { 
      if (canOpenLesson) {
        // document.getElementById('lesson2-link').click();
        window.location.href = '/lesson2.html';
      }
      else document.getElementById('warning').setAttribute('scale', '1 1 1');
    })
    if (lab3) lab3.addEventListener('click', function(e) { 
      if (canOpenLesson) {
        // document.getElementById('lesson3-link').click();
        window.location.href = '/lesson3.html';
      }
      else document.getElementById('warning').setAttribute('scale', '1 1 1');
    })
    if (lab4) lab4.addEventListener('click', function(e) { 
      if (canOpenLesson) {
        // document.getElementById('lesson4-link').click();
        window.location.href = '/lesson4.html';
      }
      else document.getElementById('warning').setAttribute('scale', '1 1 1');
    })
    
    function changeIcons(type) {
      let arr = ['right', 'left', 'pause'];
      for (let i = 0 ; i < arr.length; i++) {
        let t = arr[i];
        if (t === type) {
          // highlight it
          document.getElementById('img-' + t).setAttribute('scale', '0 0 0');
          document.getElementById('sel-img-' + t).setAttribute('scale', '1 1 1');
        } else {
          document.getElementById('img-' + t).setAttribute('scale', '1 1 1');
          document.getElementById('sel-img-' + t).setAttribute('scale', '0 0 0');
        }
      }
    }
    
    if (atom) atom.addEventListener('click', function (e) {
      popup.setAttribute('scale', '1 1 1');
    });
    
    if (closePopup) closePopup.addEventListener('click', function (e) {
      popup.setAttribute('scale', '0 0 0');
    })
  
      if (leftBtn) leftBtn.addEventListener('click', function (e) {
        mole.removeAttribute('animation');
      y = (mole.getAttribute('rotation') || {}).y || 0;
        mole.setAttribute('animation', `property: rotation; from:${x} ${y} ${z}; to: ${x} ${(y+360)} ${z}; loop: true; dur: 12000; easing: linear`)
        changeIcons('left');
      });
    if (rightBtn) rightBtn.addEventListener('click', function (e) {
        mole.removeAttribute('animation');
      y = (mole.getAttribute('rotation') || {}).y || 0;
        mole.setAttribute('animation', `property: rotation; from:${x} ${y} ${z}; to: ${x} ${(y-360)} ${z}; loop: true; dur: 12000; easing: linear`)
      changeIcons('right');
      });
    if (stopBtn) stopBtn.addEventListener('click', function (e) {
        mole.removeAttribute('animation');
      y = (mole.getAttribute('rotation') || {}).y || 0;
      changeIcons('pause');
        
      });
    for (let i = 1; i < 4; i ++) {
      for (let j = 1; j < 4; j++) {
        if (document.getElementById("m1-q" + i + "-a" + j)) {
          document.getElementById("m1-q" + i + "-a" + j).setAttribute("checked", "false");
          document.getElementById("m1-q" + i + "-a" + j).setAttribute("active", "false");
        }
      }
    }
  });