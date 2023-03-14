export default class ContactUs extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <iframe id="sc-widget" style="width:100vh;height: 100vh" scrolling="no" frameborder="no" allow="autoplay"
    src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/loleus/"></iframe>
    <script src="https://w.soundcloud.com/player/api.js" type="text/javascript"></script>
    <script>
        (function () {
      console.log("jeb")
      const widgetIframe = document.getElementById('sc-widget'),
        widget = SC.Widget(widgetIframe);
      widget.bind(SC.Widget.Events.READY, function () {
        widget.bind(SC.Widget.Events.PLAY, function () {
          widget.getCurrentSound(function (currentSound) {
            console.log('sound ' + currentSound.get('') + 'began to play');
          });
        });
        widget.getVolume(function (volume) {
          console.log('current volume value is ' + volume);
        });
        widget.setVolume(50);
      });
    
    }());
    </script>
    `;
  }
};
customElements.define("wc-contact", ContactUs);