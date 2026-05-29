import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import "../styles/dashboard.css"

const AiMessage = ({ text }) => (
  <div
    className="self-start max-w-[85%] sm:max-w-[68%] rounded-[3px_16px_16px_16px] p-[12px_15px] text-sm leading-relaxed"
    style={{
      background: 'linear-gradient(145deg, #1a2a3d 0%, #0f1c2d 100%)',
      border: '1px solid rgba(70,130,169,0.32)',
      color: 'rgba(246,244,235,0.82)',
    }}
  >
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="w-[5px] h-[5px] rounded-full bg-[#91C8E4] flex-shrink-0" />
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#749BC2]">
        Vexa-Core
      </span>
    </div>
    <div className="ai-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </div>
  </div>
)

export default AiMessage