// Widget styles with black and gold theme matching external pages
export const styles = `
  .tourify-widget {
    position: fixed;
    z-index: 999999;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-sizing: border-box;
  }

  .tourify-widget *,
  .tourify-widget *::before,
  .tourify-widget *::after {
    box-sizing: border-box;
  }

  .tourify-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 999998;
    transition: opacity 0.3s ease;
  }

  .tourify-spotlight {
    position: absolute;
    border: 2px solid #eabe7b;
    border-radius: 8px;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                0 0 30px rgba(234, 190, 123, 0.4);
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 999997;
  }

  .tourify-card {
    position: fixed;
    background: linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(5, 5, 5, 0.98) 100%);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(234, 190, 123, 0.3);
    border-radius: 16px;
    padding: 28px;
    max-width: 420px;
    min-width: 320px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
                0 0 1px rgba(234, 190, 123, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
    z-index: 999999;
  }

  @keyframes tourify-fade-in {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .tourify-header {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(234, 190, 123, 0.15);
  }

  .tourify-step-badge {
    display: inline-block;
    background: rgba(234, 190, 123, 0.15);
    border: 1px solid rgba(234, 190, 123, 0.3);
    color: #eabe7b;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  .tourify-title {
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    margin: 0 0 8px 0;
  }

  .tourify-description {
    color: rgba(255, 255, 255, 0.75);
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
  }

  .tourify-progress {
    width: 100%;
    height: 4px;
    background: rgba(234, 190, 123, 0.15);
    border-radius: 4px;
    margin: 20px 0;
    overflow: hidden;
  }

  .tourify-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #eabe7b 0%, #f5c98e 100%);
    border-radius: 4px;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(234, 190, 123, 0.4);
  }

  .tourify-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 24px;
  }

  .tourify-button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
    outline: none;
  }

  .tourify-button:active {
    transform: translateY(1px);
  }

  .tourify-button-primary {
    background: linear-gradient(135deg, #eabe7b 0%, #dd9222 100%);
    color: #000000;
    box-shadow: 0 4px 12px rgba(234, 190, 123, 0.3);
  }

  .tourify-button-primary:hover {
    background: linear-gradient(135deg, #f5c98e 0%, #e3a84f 100%);
    box-shadow: 0 6px 16px rgba(234, 190, 123, 0.4);
  }

  .tourify-button-secondary {
    background: transparent;
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .tourify-button-secondary:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.3);
  }

  .tourify-button-skip {
    background: transparent;
    color: rgba(234, 190, 123, 0.7);
    border: 1px solid rgba(234, 190, 123, 0.3);
    padding: 8px 16px;
    font-size: 13px;
  }

  .tourify-button-skip:hover {
    background: rgba(234, 190, 123, 0.1);
    color: #eabe7b;
    border-color: rgba(234, 190, 123, 0.5);
  }

  .tourify-nav-buttons {
    display: flex;
    gap: 8px;
  }

  .tourify-arrow {
    position: absolute;
    width: 0;
    height: 0;
    z-index: 999999;
  }

  .tourify-arrow-top {
    bottom: -8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgba(15, 15, 15, 0.95);
  }

  .tourify-arrow-bottom {
    top: -8px;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid rgba(15, 15, 15, 0.95);
  }

  .tourify-arrow-left {
    right: -8px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 8px solid rgba(15, 15, 15, 0.95);
  }

  .tourify-arrow-right {
    left: -8px;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid rgba(15, 15, 15, 0.95);
  }

  .tourify-avatar-container {
    width: 80px;
    height: 80px;
    margin: 0 auto 16px;
    position: relative;
  }

  @media (max-width: 640px) {
    .tourify-card {
      max-width: calc(100vw - 32px);
      min-width: calc(100vw - 32px);
      padding: 20px;
    }

    .tourify-title {
      font-size: 18px;
    }

    .tourify-description {
      font-size: 14px;
    }

    .tourify-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .tourify-nav-buttons {
      width: 100%;
    }

    .tourify-button {
      flex: 1;
    }
  }
`;
