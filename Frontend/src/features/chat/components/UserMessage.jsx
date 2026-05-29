const UserMessage = ({ text }) => (
  <div
    className="self-end max-w-[80%] sm:max-w-[62%] rounded-[16px_16px_3px_16px] px-4 py-[10px] text-sm font-bold text-[#0d1520]"
    style={{
      background: 'linear-gradient(180deg, #91C8E4 0%, #749BC2 100%)',
      boxShadow: '0 2px 16px rgba(145,200,228,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
    }}
  >
    {text}
  </div>
)

export default UserMessage