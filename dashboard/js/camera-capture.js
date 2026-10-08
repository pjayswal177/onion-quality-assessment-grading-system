/**
 * Real Camera Capture Module
 * Provides live video preview and photo capture for onion inspection
 */

class CameraCapture {
  constructor(videoElementId, canvasElementId) {
    this.videoElement = document.getElementById(videoElementId);
    this.canvasElement = document.getElementById(canvasElementId);
    this.ctx = this.canvasElement.getContext('2d');
    this.stream = null;
    this.constraints = {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'environment' // Rear camera on mobile
      },
      audio: false
    };
  }

  async initialize() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
      this.videoElement.srcObject = this.stream;
      this.videoElement.play();
      
      // Set canvas size to match video
      this.videoElement.addEventListener('loadedmetadata', () => {
        this.canvasElement.width = this.videoElement.videoWidth;
        this.canvasElement.height = this.videoElement.videoHeight;
      });

      return true;
    } catch (error) {
      console.error('Camera access denied or unavailable:', error);
      return false;
    }
  }

  /**
   * Capture current frame as an image blob
   * @returns {Promise<Blob>} Image blob in JPEG format
   */
  async captureImage() {
    return new Promise((resolve) => {
      this.ctx.drawImage(
        this.videoElement,
        0, 0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      this.canvasElement.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.95);
    });
  }

  /**
   * Draw overlay on canvas (e.g., focus circle for onion positioning)
   */
  drawFocusOverlay() {
    const width = this.canvasElement.width;
    const height = this.canvasElement.height;
    
    // Semi-transparent background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.fillRect(0, 0, width, height);
    
    // Center circle for onion positioning
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.2;
    
    this.ctx.clearRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
    this.ctx.strokeStyle = '#00ff00';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.stroke();
    
    // Text
    this.ctx.fillStyle = '#00ff00';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Position onion in circle', centerX, height - 20);
  }

  /**
   * Stop camera and release resources
   */
  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
  }
}

// Export for use in dashboard
window.CameraCapture = CameraCapture;
