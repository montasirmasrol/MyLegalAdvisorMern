import { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatRef = useRef(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Welcome message when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Welcome to Global Lawyer! How can I assist you today? You can ask about our services, consultation fees, or book an appointment.",
          sender: 'bot'
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Predefined QA pairs
  const predefinedAnswers = {
    // Greetings
    'hello': 'Hello! How can I help you with legal consultation today?',
    'hi': 'Hi! How can I assist you with legal matters?',
    'hey': 'Hey there! What legal assistance can I provide you with?',
    
    // Services
    'consultation': 'We offer various legal consultation services. Would you like to book an appointment with a lawyer?',
    'services': 'We provide legal services in various areas including:\n• Criminal Law\n• Family Law\n• Corporate Law\n• Civil Rights\n• Immigration Law\n• Real Estate Law\n• Employment Law\nWhich area interests you?',
    'practice areas': 'Our practice areas include criminal defense, family law, business law, immigration, real estate, and more. Which area would you like to know more about?',
    
    // Appointments
    'appointment': 'You can book an appointment by:\n1. Visiting our booking section\n2. Calling us at (123) 456-7890\n3. Sending an email to appointment@globallawyer.com',
    'book': 'Would you like to book a consultation? You can choose between in-person, video call, or phone consultation.',
    'schedule': 'Our lawyers are available Monday to Friday, 9 AM to 5 PM. Would you like to schedule a consultation?',
    
    // Costs
    'cost': 'Our consultation fees vary depending on the type of case and lawyer:\n• Initial Consultation: $100\n• Criminal Cases: Starting from $200\n• Family Law: Starting from $150\n• Corporate Law: Starting from $250',
    'fees': 'Our fee structure varies by case type. Would you like to know about a specific service?',
    'price': 'Our pricing is competitive and transparent. Initial consultation starts at $100. Would you like detailed pricing for specific services?',
    
    // Location & Hours
    'location': 'We have offices in:\n• Downtown - 123 Main St\n• Westside - 456 Park Ave\n• Northside - 789 Lake Blvd\nWhich location is most convenient for you?',
    'working hours': 'Our office hours are:\nMonday to Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 2:00 PM\nSunday: Closed',
    'address': "Our main office is located at 123 Main Street, Suite 100. We also offer virtual consultations if that's more convenient.",
    
    // Specific Legal Areas
    'criminal law': 'Our criminal law services include defense for:\n• DUI/DWI\n• Drug Offenses\n• Assault Charges\n• White Collar Crimes\nWhat type of case do you need help with?',
    'family law': 'We handle family law matters including:\n• Divorce\n• Child Custody\n• Alimony\n• Adoption\nHow can we help with your family law needs?',
    'corporate law': 'Our corporate law services include:\n• Business Formation\n• Contract Review\n• Mergers & Acquisitions\n• Intellectual Property\nWhat business matter can we assist with?',
    
    // Emergency
    'emergency': 'For legal emergencies, please call our 24/7 hotline: (888) 999-9999. For immediate criminal matters, please contact your local authorities first.',
    'urgent': 'If this is an urgent legal matter, please call our emergency line at (888) 999-9999.',
    
    // Payment
    'payment': 'We accept various payment methods including:\n• Credit Cards\n• Debit Cards\n• Bank Transfers\n• Payment Plans Available',
    'insurance': 'We work with several legal insurance providers. Please contact our office with your insurance details for verification.',
    
    // Help
    'help': 'I can help you with information about our services, booking appointments, fees, and locations. What would you like to know?',
    'contact': 'You can reach us at:\nPhone: (123) 456-7890\nEmail: info@globallawyer.com\nOr visit our office during business hours.'
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];

    // Find response from predefined answers (case insensitive)
    const userInput = inputMessage.toLowerCase();
    let response = "I apologize, but I couldn't understand your question. Please contact our office for more specific information.";

    // Check if any key phrase is contained in the user input
    for (const [key, value] of Object.entries(predefinedAnswers)) {
      if (userInput.includes(key)) {
        response = value;
        break;
      }
    }

    // Add bot response
    newMessages.push({ text: response, sender: 'bot' });

    setMessages(newMessages);
    setInputMessage('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50" ref={chatRef}>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#016060] text-white p-4 rounded-full shadow-lg hover:bg-[#016060]/50 transition-colors duration-200"
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border">
          {/* Chat Header */}
          <div className="bg-[#016060] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Legal Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-[#016060]/50 p-1 rounded transition-colors duration-200"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-64 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`chat-message-${index+1}`}
                className={`mb-2 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#016060] text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={handleSend}
                className="bg-[#016060] text-white px-4 py-2 rounded hover:bg-[#016060]/50 transition-colors duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot; 