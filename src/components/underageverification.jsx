export default function UnderageRestriction() {
  return (
    <div className="modal-overlay">
      <div className="modal-content underage-content">
        <div className="modal-header">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Access Restricted</h2>
        </div>
        <div className="modal-body">
          <div className="restriction-icon">
            <i className="fas fa-ban"></i>
          </div>
          <h3>Sorry, you must be 18 or older to use this service.</h3>
          <p>This chat platform is designed for adult users only.</p>
          <div className="restriction-links">
            <a href="https://www.commonsensemedia.org/" target="_blank">
              <i className="fas fa-external-link-alt"></i> Find Age-Appropriate Chat Platforms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
