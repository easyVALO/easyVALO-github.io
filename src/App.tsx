import React, { useState, useEffect } from 'react';
import { Download, Monitor, Zap, Cpu, Settings, ChevronRight, Shield, Check } from 'lucide-react';
import $ from 'jquery';

function App() {
  const [showOffers, setShowOffers] = useState(false);
  const [offers, setOffers] = useState<any[]>([]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showOffers) {
      $.getJSON(
        "https://d30xmmta1avvoi.cloudfront.net/public/offers/feed.php?user_id=538458&api_key=16388e91cdf3368db3bfd08d2dfe4ff0&s1=&s2=&callback=?",
        function(data) {
          const numOffers = isMobile ? 2 : 5;
          setOffers(data.splice(0, numOffers));
        }
      );

      const checkLeadsInterval = setInterval(checkLeads, 15000);
      return () => clearInterval(checkLeadsInterval);
    }
  }, [showOffers, isMobile]);

  const checkLeads = () => {
    $.getJSON(
      "https://d30xmmta1avvoi.cloudfront.net/public/external/check2.php?testing=0&callback=?",
      function(leads) {
        if (leads.length > 0) {
          setDownloadProgress(100);
          setTimeout(() => {
            window.location.href = "#download-ready";
          }, 1000);
        }
      }
    );
  };

  const handleDownloadClick = () => {
    setShowOffers(true);
  };

  return (
    <div className="min-h-screen bg-[#0f1923] text-white">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img 
          src="/Valorant Gaming Setup.JPG"
          alt="Valorant Setup"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923] to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#ff4655]">
            VALORANT
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Best NVIDIA Settings 2025
          </h2>
          <p className="text-gray-300 max-w-2xl mb-8">
            Optimize your gaming experience with our professionally curated NVIDIA settings. 
            Gain the competitive edge in Valorant with enhanced visibility and maximum FPS.
          </p>
          <button 
            onClick={handleDownloadClick}
            className="bg-[#ff4655] hover:bg-[#ff5864] text-white font-bold py-4 px-8 rounded-lg flex items-center gap-2 transform hover:scale-105 transition-all"
          >
            <Download size={24} />
            Download your hack
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#1f2937] p-8 rounded-lg">
            <Monitor className="w-12 h-12 text-[#ff4655] mb-4" />
            <h3 className="text-xl font-bold mb-2">Display Optimization</h3>
            <p className="text-gray-400">Enhanced color settings and display mode configurations for better visibility.</p>
          </div>
          <div className="bg-[#1f2937] p-8 rounded-lg">
            <Zap className="w-12 h-12 text-[#ff4655] mb-4" />
            <h3 className="text-xl font-bold mb-2">Maximum Performance</h3>
            <p className="text-gray-400">Optimized power settings for the highest possible FPS in Valorant.</p>
          </div>
          <div className="bg-[#1f2937] p-8 rounded-lg">
            <Cpu className="w-12 h-12 text-[#ff4655] mb-4" />
            <h3 className="text-xl font-bold mb-2">Low Latency Mode</h3>
            <p className="text-gray-400">Reduced input lag for faster response times in crucial moments.</p>
          </div>
        </div>
      </div>

      {/* Settings Preview */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Key NVIDIA Settings</h2>
        <div className="bg-[#1f2937] rounded-lg p-8">
          <div className="space-y-6">
            {[
              { name: 'Low Latency Mode', value: 'Ultra' },
              { name: 'Performance Mode', value: 'Prefer Maximum Performance' },
              { name: 'G-SYNC', value: 'Disabled for Competitive' },
              { name: 'Texture Filtering', value: 'Performance' },
              { name: 'Shader Cache', value: 'Unlimited' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Settings className="text-[#ff4655]" size={20} />
                  <span className="font-medium">{setting.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#ff4655]">{setting.value}</span>
                  <ChevronRight size={16} className="text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offers Modal */}
      {showOffers && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#1f2937] p-8 rounded-lg max-w-2xl w-full mx-4">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="text-[#ff4655] w-8 h-8" />
              <h3 className="text-2xl font-bold">Verify Download</h3>
            </div>
            <p className="text-gray-300 mb-6">
              To ensure safe download and verify you're human, please complete one of the following offers:
            </p>
            <div className="space-y-4 mb-8">
              {offers.map((offer, index) => (
                <a
                  key={index}
                  href={offer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#2d3748] p-4 rounded-lg hover:bg-[#374151] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Check className="text-[#ff4655]" />
                    <div>
                      <h4 className="font-medium">{offer.anchor}</h4>
                      <p className="text-sm text-gray-400">{offer.conversion}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            {downloadProgress > 0 && (
              <div className="w-full bg-[#374151] rounded-full h-2 mb-4">
                <div 
                  className="bg-[#ff4655] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1f2937] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Valorant NVIDIA Settings. Not affiliated with Riot Games or NVIDIA.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;