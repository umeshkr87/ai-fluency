import { useEffect, useState } from "react";

const PHASES = {
  foundation: { name: "Foundations", color: "#3B5B8C", tint: "#E8EEF7" },
  core: { name: "Open-weight agents", color: "#0F7B6C", tint: "#E5F3F0" },
  platform: { name: "Enterprise platform", color: "#A8650F", tint: "#F8EEDD" },
  launch: { name: "Package and apply", color: "#7A3E7E", tint: "#F3E9F4" },
};

const TAGS = {
  learn: { label: "Learn", color: "#3B5B8C" },
  build: { label: "Build", color: "#0F6B8C" },
  setup: { label: "Setup", color: "#5A6A76" },
  eval: { label: "Evals", color: "#0F7B6C" },
  gpu: { label: "Rented GPU", color: "#B4432B" },
  career: { label: "Career", color: "#7A3E7E" },
  interview: { label: "Interview", color: "#A8650F" },
  tooling: { label: "AI tools", color: "#1F7A4D" },
};

const WEEKS = [
  {
    week: "1",
    phase: "foundation",
    title: "Python crash course, 3Blue1Brown, Mac setup",
    hours: "6 hrs",
    why: "Python depth is the base for everything after this. Learn it by difference from Java, and type every exercise yourself.",
    tasks: [
      { text: "Install Python 3.12 and uv, then create a project folder and virtual environment", tag: "setup" },
      { text: "Work through a Python crash course aimed at Java developers: comprehensions, decorators, async/await, type hints, dataclasses, context managers", tag: "learn" },
      { text: "Type every exercise by hand and write 3 small programs without looking up syntax", tag: "build" },
      { text: "Watch the 3Blue1Brown neural network series (about 1 hour)", tag: "learn" },
      { text: "Install Ollama, pull one small model, and send it a prompt from the terminal", tag: "setup" },
      { text: "Write down your current Claude Code and Copilot workflow: what you use them for, where they failed, what you changed", tag: "tooling" },
    ],
    resources: [
  {
    "name": "Python for Java Developers (Udemy)",
    "url": "https://www.udemy.com/course/python-for-java-developers/",
    "note": "skim it, about 5.5 hours, skips the basics you know"
  },
  {
    "name": "python-for-java-developers on GitHub",
    "url": "https://github.com/blu3r4y/python-for-java-developers",
    "note": "quick Java-to-Python cheat sheet"
  },
  {
    "name": "Real Python: decorators primer and asyncio walkthrough",
    "url": "https://realpython.com/",
    "note": "topic-by-topic reference"
  },
  {
    "name": "Official Python docs",
    "url": "https://docs.python.org/3/",
    "note": "asyncio, typing, dataclasses, contextlib"
  },
  {
    "name": "Effective Python by Brett Slatkin",
    "note": "the professional layer, read after the drills"
  },
  {
    "name": "3Blue1Brown: Neural Networks series",
    "url": "https://www.3blue1brown.com/topics/neural-networks",
    "note": "about 1 hour"
  },
  {
    "name": "uv documentation",
    "url": "https://docs.astral.sh/uv/",
    "note": "Python and environment setup"
  },
  {
    "name": "Ollama",
    "url": "https://ollama.com/",
    "note": "run open-weight models locally"
  }
],
    milestone: "You can write short Python programs without constant lookups and explain in your own words what a neural network learns.",
  },
  {
    week: "2",
    phase: "foundation",
    title: "What an LLM does, and basic API calls",
    hours: "6 hrs",
    why: "You need a precise mental model before you debug agents: tokens, context, sampling, and how tool calling really works.",
    tasks: [
      { text: "Study tokens, context windows, sampling and temperature, system vs user messages, hallucination, and what open-weight and quantization mean", tag: "learn" },
      { text: "Call a hosted model API: chat, streaming, structured output, and one function call", tag: "build" },
      { text: "Call the local Ollama model through the same OpenAI-compatible client and compare response format and quality", tag: "build" },
      { text: "Log tokens and latency for each call in a small table", tag: "build" },
      { text: "Ask Claude Code to review one of your scripts and note what it caught and what it missed", tag: "tooling" },
    ],
    resources: [
  {
    "name": "Karpathy: Intro to Large Language Models",
    "note": "about 1 hour talk on YouTube, general audience"
  },
  {
    "name": "Anthropic API docs",
    "url": "https://docs.claude.com/",
    "note": "messages, streaming, tool use, structured output"
  },
  {
    "name": "OpenAI API docs",
    "url": "https://platform.openai.com/docs",
    "note": "the client format that vLLM and Ollama copy"
  },
  {
    "name": "DeepLearning.AI: ChatGPT Prompt Engineering for Developers",
    "url": "https://www.deeplearning.ai/short-courses/",
    "note": "free short course"
  }
],
    milestone: "One script sends the same prompt to a hosted model and a local model and logs tokens and latency for both.",
  },
  {
    week: "3",
    phase: "foundation",
    title: "First FastAPI CRUD app",
    hours: "6 hrs",
    why: "FastAPI is your service layer for everything that follows. The /docs page will feel like SpringDoc without the configuration.",
    tasks: [
      { text: "Build a products CRUD API with FastAPI and Pydantic v2", tag: "build" },
      { text: "Open the generated /docs page and compare it with how you configure SpringDoc in Java", tag: "learn" },
      { text: "Write pytest tests for every endpoint using FastAPI's test client", tag: "build" },
      { text: "Add an /ask endpoint that sends a question about a product to the local model", tag: "build" },
      { text: "Let Copilot or Claude Code draft the tests, review them yourself, and write down what you changed", tag: "tooling" },
    ],
    resources: [
  {
    "name": "FastAPI official tutorial",
    "url": "https://fastapi.tiangolo.com/tutorial/",
    "note": "the best single source, includes testing"
  },
  {
    "name": "Pydantic documentation",
    "url": "https://docs.pydantic.dev/",
    "note": "v2 models and validation"
  },
  {
    "name": "pytest documentation",
    "url": "https://docs.pytest.org/",
    "note": "fixtures and parametrization"
  }
],
    milestone: "A tested FastAPI service with one model-backed endpoint.",
  },
  {
    week: "4",
    phase: "foundation",
    title: "Intro RAG on a local open-weight model",
    hours: "6 hrs",
    why: "Keep it simple here. This project becomes the baseline you measure against in the evals weeks.",
    tasks: [
      { text: "Study embeddings and similarity search, and choose a small synthetic telco FAQ document set", tag: "learn" },
      { text: "Build RAG: chunk, embed with sentence-transformers, store in ChromaDB, retrieve, and answer with the Ollama model", tag: "build" },
      { text: "Hand-check 10 questions and mark each right or wrong with the reason", tag: "eval" },
      { text: "Save these results as your baseline for later comparison", tag: "eval" },
    ],
    resources: [
  {
    "name": "Sentence Transformers documentation",
    "url": "https://www.sbert.net/",
    "note": "embeddings and similarity"
  },
  {
    "name": "Chroma documentation",
    "url": "https://docs.trychroma.com/",
    "note": "collections, queries, metadata filters"
  },
  {
    "name": "DeepLearning.AI: Building and Evaluating Advanced RAG",
    "url": "https://www.deeplearning.ai/short-courses/",
    "note": "free short course that ties RAG to evaluation"
  },
  {
    "name": "Hugging Face LLM Course",
    "url": "https://huggingface.co/learn/llm-course",
    "note": "free, background on tokenizers and embeddings"
  }
],
    milestone: "A working RAG project with a hand-scored baseline.",
  },
  {
    week: "5-6",
    phase: "foundation",
    title: "Transformers and GPT by hand, at a high level",
    hours: "8 to 12 hrs",
    why: "The goal is a working mental model, not a research course. Karpathy's Neural Networks: Zero to Hero is the guide, and the full playlist stays open as a background track at your own pace.",
    tasks: [
      { text: "Watch the first makemore video (bigram language model) and type along to learn tensors, the training loop, and autoregressive next-token prediction", tag: "learn" },
      { text: "Watch Let's build GPT and code along slowly enough to explain each block: embeddings, positional information, self-attention with queries, keys, and values, multi-head attention, feed-forward layers, residuals, and layer norm", tag: "build" },
      { text: "Skim the tokenizer lecture to see how byte-pair encoding works and why tokenization causes odd model behavior", tag: "learn" },
      { text: "Train the tiny GPT on a small text file on your Mac and sample from it", tag: "build" },
      { text: "Write a one-page explanation in your own words of how a decoder-only transformer generates one token, and where the KV cache and quantization fit", tag: "learn" },
      { text: "Ask Claude Code to quiz you on your explanation and note the gaps it finds", tag: "tooling" },
    ],
    resources: [
  {
    "name": "Karpathy: Neural Networks, Zero to Hero",
    "url": "https://karpathy.ai/zero-to-hero.html",
    "note": "the lectures; the whole playlist runs roughly 12 to 19 hours, so use the subset in this block"
  },
  {
    "name": "nn-zero-to-hero on GitHub",
    "url": "https://github.com/karpathy/nn-zero-to-hero",
    "note": "notebooks for every lecture"
  },
  {
    "name": "3Blue1Brown: transformers and attention chapters",
    "url": "https://www.3blue1brown.com/topics/neural-networks",
    "note": "visual companion to the GPT lecture"
  },
  {
    "name": "The Illustrated Transformer by Jay Alammar",
    "url": "https://jalammar.github.io/illustrated-transformer/",
    "note": "classic diagrams, read after the lecture"
  },
  {
    "name": "Attention Is All You Need (2017 paper)",
    "note": "skim the architecture section only"
  }
],
    milestone: "You can explain how a GPT generates text and connect it to context windows, the KV cache, and tool-call quirks.",
  },
  {
    week: "7-8",
    phase: "core",
    title: "Open-weight tool calling and the telco agent",
    hours: "12 hrs",
    why: "This is where your agentic work starts. The goal is to see exactly how open-weight models fail at tool calling, because enterprises need to know that.",
    tasks: [
      { text: "Refactor your LangGraph telco capstone so the model is a config setting behind an OpenAI-compatible endpoint", tag: "build" },
      { text: "Run it on 2 or 3 local models, sized to fit your Mac's memory", tag: "build" },
      { text: "Keep a failure journal: malformed tool-call JSON, wrong tool choice, bad arguments, chat-template quirks", tag: "learn" },
      { text: "Add retries and Pydantic validation around every tool call", tag: "build" },
      { text: "Use Claude Code for a multi-file refactor of the agent and record where it needed correction", tag: "tooling" },
    ],
    resources: [
  {
    "name": "Anthropic: Building effective agents",
    "url": "https://www.anthropic.com/engineering/building-effective-agents",
    "note": "workflow vs agent patterns, read first"
  },
  {
    "name": "DeepLearning.AI: AI Agents in LangGraph",
    "url": "https://www.deeplearning.ai/courses/ai-agents-in-langgraph",
    "note": "free, about 90 minutes, a gap check on what you already know"
  },
  {
    "name": "LangChain Academy: Introduction to LangGraph",
    "url": "https://academy.langchain.com/",
    "note": "free, roughly 6 to 8 hours, production depth"
  },
  {
    "name": "LangGraph documentation",
    "url": "https://langchain-ai.github.io/langgraph/",
    "note": "persistence, human-in-the-loop, supervisor patterns"
  },
  {
    "name": "Berkeley Function Calling Leaderboard",
    "url": "https://gorilla.cs.berkeley.edu/leaderboard",
    "note": "use it to shortlist open-weight models for tool calling"
  },
  {
    "name": "Ollama",
    "url": "https://ollama.com/",
    "note": "tool calling and structured output with local models"
  },
  {
    "name": "Model Context Protocol documentation",
    "url": "https://modelcontextprotocol.io/",
    "note": "servers, tools, and the spec"
  },
  {
    "name": "Hugging Face Agents Course",
    "url": "https://huggingface.co/learn/agents-course",
    "note": "optional, about 20 to 30 hours, free to audit"
  }
],
    milestone: "The same agent runs on a hosted model and on local open-weight models, with a written list of failure modes.",
  },
  {
    week: "9-10",
    phase: "core",
    title: "Agent evals",
    hours: "12 hrs",
    why: "Evals are the biggest differentiator. They turn opinions about models into a decision a company can act on.",
    tasks: [
      { text: "Write 30 to 50 telco task scenarios with expected tool calls and outcomes", tag: "eval" },
      { text: "Score tool selection, argument validity, task success, number of steps, latency, and cost", tag: "eval" },
      { text: "Trace every run in LangSmith", tag: "setup" },
      { text: "Compare one hosted model with 2 or 3 open-weight models, using a hosted open-weight API for any model too large for your Mac", tag: "eval" },
      { text: "Extend your week 4 RAG baseline with recall@k and a faithfulness check", tag: "eval" },
    ],
    resources: [
  {
    "name": "Hamel Husain: Your AI Product Needs Evals",
    "url": "https://hamel.dev/blog/posts/evals/",
    "note": "start here: error analysis, traces, LLM judges"
  },
  {
    "name": "Berkeley Function Calling Leaderboard and paper",
    "url": "https://gorilla.cs.berkeley.edu/leaderboard",
    "note": "how function-calling accuracy is scored"
  },
  {
    "name": "tau-bench by Sierra",
    "url": "https://github.com/sierra-research/tau-bench",
    "note": "a pattern for multi-turn agent tasks with domain tools"
  },
  {
    "name": "LangSmith documentation",
    "url": "https://docs.smith.langchain.com/",
    "note": "datasets, experiments, tracing"
  },
  {
    "name": "Eugene Yan: Patterns for Building LLM-based Systems",
    "url": "https://eugeneyan.com/writing/llm-patterns/",
    "note": "evals, guardrails, caching"
  },
  {
    "name": "AI Engineering by Chip Huyen",
    "note": "the evaluation chapters"
  }
],
    milestone: "A results table showing where open-weight models are good enough and where they fall short.",
  },
  {
    week: "11-12",
    phase: "platform",
    title: "Serve it like an enterprise",
    hours: "12 hrs",
    why: "This is where your Kubernetes, IAM, and API platform experience becomes the story. vLLM and SGLang mainly target NVIDIA GPUs, so this is the only stretch that needs rented hardware.",
    tasks: [
      { text: "Script the GPU instance setup (Dockerfile plus launch script) so you can rebuild it in minutes", tag: "setup" },
      { text: "Use synthetic data only on rented GPUs, never work code, data, or credentials", tag: "setup" },
      { text: "Serve one model with vLLM or SGLang behind an OpenAI-compatible endpoint", tag: "gpu" },
      { text: "Put a gateway in front with routing and fallback: open model first, hosted model when needed", tag: "build" },
      { text: "Add OAuth2, per-tenant quotas, and rate limits", tag: "build" },
      { text: "Measure time to first token and tokens per second under load, and compare vLLM and SGLang on your agent workload if time allows", tag: "gpu" },
      { text: "Stop the instance after every session and set a spending cap (budget about $20 to $40)", tag: "setup" },
    ],
    resources: [
  {
    "name": "vLLM documentation",
    "url": "https://docs.vllm.ai/",
    "note": "OpenAI-compatible server, plus the tool-calling options agents need"
  },
  {
    "name": "SGLang on GitHub",
    "url": "https://github.com/sgl-project/sglang",
    "note": "prefix caching for agent workloads"
  },
  {
    "name": "LiteLLM documentation",
    "url": "https://docs.litellm.ai/",
    "note": "open-source gateway; Bifrost and Envoy AI Gateway are alternatives"
  },
  {
    "name": "RunPod documentation",
    "url": "https://docs.runpod.io/",
    "note": "pods, volumes, per-second billing"
  },
  {
    "name": "FastAPI security tutorial",
    "url": "https://fastapi.tiangolo.com/tutorial/security/",
    "note": "OAuth2 and JWT patterns for your gateway"
  },
  {
    "name": "AI Engineering by Chip Huyen",
    "note": "the inference optimization and serving chapters"
  }
],
    milestone: "The agent platform runs from a rented GPU with load numbers and a written routing policy.",
  },
  {
    week: "13",
    phase: "platform",
    title: "Governance and model choice",
    hours: "6 hrs",
    why: "Enterprises will not deploy agents without permission scopes, audit trails, and a plan for misuse.",
    tasks: [
      { text: "Give each MCP tool the least privilege it needs", tag: "build" },
      { text: "Run prompt injection tests against your agent and record what got through", tag: "eval" },
      { text: "Add an audit log of tool calls, PII redaction, and human approval for risky actions", tag: "build" },
      { text: "Write a short note on when to use prompting, RAG, or LoRA fine-tuning with open-weight models", tag: "learn" },
    ],
    resources: [
  {
    "name": "OWASP Top 10 for LLM Applications (2025)",
    "url": "https://genai.owasp.org/llm-top-10/",
    "note": "prompt injection, excessive agency, system prompt leakage"
  },
  {
    "name": "Model Context Protocol documentation",
    "url": "https://modelcontextprotocol.io/",
    "note": "authorization and tool safety guidance"
  },
  {
    "name": "NIST AI Risk Management Framework",
    "url": "https://www.nist.gov/itl/ai-risk-management-framework",
    "note": "enterprise governance vocabulary"
  },
  {
    "name": "Hugging Face LLM Course and PEFT docs",
    "url": "https://huggingface.co/learn/llm-course",
    "note": "LoRA and fine-tuning basics"
  }
],
    milestone: "A governed agent with a test record and a clear model-choice note.",
  },
  {
    week: "14",
    phase: "launch",
    title: "Package and apply",
    hours: "6 hrs",
    why: "Start light networking and applications around week 10 so your search is already moving when the project is done. Take the time you need, but protect the evals and serving weeks.",
    tasks: [
      { text: "Publish the repo with an architecture diagram and your results table as the headline", tag: "build" },
      { text: "Write a model decision report from your real numbers: when to use open-weight, when to escalate", tag: "career" },
      { text: "Rewrite your resume with outcome-based bullets", tag: "career" },
      { text: "Practice the design question: build an on-prem enterprise agent platform", tag: "interview" },
      { text: "Write a short AI tools playbook using only numbers you measured", tag: "tooling" },
      { text: "Apply to about 5 roles a week and message people who build agent platforms", tag: "career" },
    ],
    resources: [
  {
    "name": "ByteByteGo and Hello Interview",
    "note": "system design practice, adapted to the agent platform question"
  },
  {
    "name": "AI Engineering by Chip Huyen",
    "note": "architecture and feedback-loop chapters, good interview vocabulary"
  },
  {
    "name": "Designing Machine Learning Systems by Chip Huyen",
    "note": "production ML context"
  }
],
    milestone: "A public project with measured results, an updated resume, and active applications.",
  },
];

const NOTES = [
  { color: "#14202B", text: "About 6 hours a week, Mac first. A rented NVIDIA GPU is needed only in weeks 11 and 12, for roughly $20 to $40. Use synthetic data there and keep work code and data off it." },
  { color: "#A8650F", text: "AI tools thread: about 30 minutes inside each week to log where Claude Code and Copilot helped, where they failed, and how your workflow changed." },
  { color: "#7A3E7E", text: "Parked for now: OpenStack, the data-engineering phase, and CCA-F exam booking." },
];

const STORE_KEY = "agentic-roadmap-v1";

function loadDone() {
  const blank = WEEKS.map((w) => w.tasks.map(() => false));
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return blank;
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved) || saved.length !== blank.length) return blank;
    return blank.map((w, i) => w.map((_, j) => Boolean(saved[i] && saved[i][j])));
  } catch {
    return blank;
  }
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
.ar { font-family: 'IBM Plex Sans', system-ui, sans-serif; background: #EEF1F4; color: #14202B; min-height: 100vh; padding: 36px 16px 64px; line-height: 1.55; }
.ar *, .ar *::before, .ar *::after { box-sizing: border-box; }
.ar h1, .ar h2 { font-family: 'Newsreader', Georgia, serif; font-weight: 600; margin: 0; }
.ar-wrap { max-width: 760px; margin: 0 auto; }
.ar h1 { font-size: clamp(30px, 6vw, 44px); line-height: 1.12; letter-spacing: -0.01em; }
.ar-lede { max-width: 62ch; color: #33434F; font-size: 16.5px; margin: 14px 0 22px; }
.ar-progress { display: flex; align-items: center; gap: 12px; margin-bottom: 26px; }
.ar-bar { flex: 1; height: 6px; background: #D2DAE1; border-radius: 3px; overflow: hidden; }
.ar-fill { height: 100%; background: #0F7B6C; transition: width 0.3s ease; }
.ar-count { font-size: 13px; color: #5A6A76; font-variant-numeric: tabular-nums; }
.ar-note { border-left: 3px solid var(--c); padding: 1px 0 1px 14px; margin: 0 0 12px; max-width: 70ch; font-size: 14.5px; color: #26343F; }
.ar-phase { font-size: 22px; margin: 34px 0 10px; color: var(--c); }
.ar-week { border-left: 4px solid var(--c); background: #fff; margin-bottom: 8px; }
.ar-btn { width: 100%; display: flex; gap: 14px; align-items: center; text-align: left; padding: 14px 16px; background: transparent; border: 0; cursor: pointer; font: inherit; color: inherit; }
.ar-btn:hover { background: var(--t); }
.ar-btn:focus-visible, .ar-task input:focus-visible { outline: 2px solid var(--c); outline-offset: 2px; }
.ar-wk { min-width: 68px; font-weight: 600; font-size: 14px; color: var(--c); }
.ar-title { display: block; font-weight: 600; font-size: 15.5px; }
.ar-hrs { display: block; font-size: 13px; color: #5A6A76; }
.ar-chev { color: #5A6A76; transition: transform 0.2s ease; }
.ar-chev.open { transform: rotate(180deg); }
.ar-body { padding: 4px 16px 18px 98px; }
.ar-why { margin: 0 0 12px; color: #33434F; font-size: 14.5px; max-width: 64ch; }
.ar-task { display: flex; gap: 10px; align-items: flex-start; padding: 7px 0; cursor: pointer; font-size: 14.5px; }
.ar-task input { margin-top: 4px; width: 16px; height: 16px; accent-color: var(--c); flex-shrink: 0; }
.ar-task.done .ar-txt { color: #6B7A86; text-decoration: line-through; }
.ar-txt { flex: 1; }
.ar-pill { font-size: 12px; line-height: 1.5; padding: 0 8px; border: 1px solid currentColor; border-radius: 10px; white-space: nowrap; flex-shrink: 0; margin-top: 2px; }
.ar-res { margin-top: 16px; font-size: 14px; }
.ar-res-title { font-weight: 600; margin-bottom: 4px; }
.ar-res ul { margin: 0; padding-left: 18px; }
.ar-res li { margin: 4px 0; }
.ar-res a { color: var(--c); text-underline-offset: 2px; }
.ar-res a:focus-visible { outline: 2px solid var(--c); outline-offset: 2px; }
.ar-res-note { color: #5A6A76; }
.ar-mile { margin-top: 14px; padding-left: 12px; border-left: 3px solid var(--c); font-size: 14.5px; color: #26343F; }
@media (max-width: 600px) {
  .ar-body { padding-left: 16px; }
  .ar-wk { min-width: 52px; }
  .ar-task { flex-wrap: wrap; }
  .ar-pill { margin-left: 26px; }
}
@media (prefers-reduced-motion: reduce) {
  .ar *, .ar *::before, .ar *::after { transition: none !important; }
}
`;

export default function AgenticRoadmap() {
  const [open, setOpen] = useState(0);
  const [done, setDone] = useState(loadDone);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(done));
    } catch {
      /* storage can be unavailable; progress then lasts only for this session */
    }
  }, [done]);

  const toggle = (wi, ti) =>
    setDone((prev) => prev.map((w, i) => (i === wi ? w.map((v, j) => (j === ti ? !v : v)) : w)));

  const total = done.flat().length;
  const finished = done.flat().filter(Boolean).length;
  const pct = Math.round((finished / total) * 100);

  return (
    <div className="ar">
      <style>{CSS}</style>
      <div className="ar-wrap">
        <h1>Agentic AI engineer: open-weight models for the enterprise</h1>
        <p className="ar-lede">
          A 14-week plan, at your own pace, for a backend engineer moving into agentic AI. You build one telco agent, run it on hosted and
          open-weight models, measure where each one works, and serve it the way an enterprise would.
        </p>

        <div className="ar-progress">
          <div className="ar-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Plan progress">
            <div className="ar-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="ar-count">{finished} of {total} tasks</span>
        </div>

        {NOTES.map((n) => (
          <p key={n.text} className="ar-note" style={{ "--c": n.color }}>{n.text}</p>
        ))}

        {WEEKS.map((w, wi) => {
          const ph = PHASES[w.phase];
          const isOpen = open === wi;
          const d = done[wi].filter(Boolean).length;
          const showPhase = wi === 0 || WEEKS[wi - 1].phase !== w.phase;
          return (
            <div key={w.week}>
              {showPhase && (
                <h2 className="ar-phase" style={{ "--c": ph.color }}>{ph.name}</h2>
              )}
              <div className="ar-week" style={{ "--c": ph.color, "--t": ph.tint }}>
                <button
                  className="ar-btn"
                  aria-expanded={isOpen}
                  aria-controls={`wk-${wi}`}
                  onClick={() => setOpen(isOpen ? -1 : wi)}
                >
                  <span className="ar-wk">Week {w.week}</span>
                  <span style={{ flex: 1 }}>
                    <span className="ar-title">{w.title}</span>
                    <span className="ar-hrs">{w.hours}</span>
                  </span>
                  <span className="ar-count">{d}/{w.tasks.length}</span>
                  <span className={`ar-chev${isOpen ? " open" : ""}`} aria-hidden="true">▾</span>
                </button>
                {isOpen && (
                  <div className="ar-body" id={`wk-${wi}`}>
                    <p className="ar-why">{w.why}</p>
                    {w.tasks.map((t, ti) => (
                      <label key={t.text} className={`ar-task${done[wi][ti] ? " done" : ""}`}>
                        <input type="checkbox" checked={done[wi][ti]} onChange={() => toggle(wi, ti)} />
                        <span className="ar-txt">{t.text}</span>
                        <span className="ar-pill" style={{ color: TAGS[t.tag].color }}>{TAGS[t.tag].label}</span>
                      </label>
                    ))}
                    {w.resources && w.resources.length > 0 && (
                      <div className="ar-res">
                        <div className="ar-res-title">Resources</div>
                        <ul>
                          {w.resources.map((r) => (
                            <li key={r.name}>
                              {r.url ? (
                                <a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}</a>
                              ) : (
                                <span>{r.name}</span>
                              )}
                              {r.note ? <span className="ar-res-note">: {r.note}</span> : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="ar-mile"><strong>Milestone:</strong> {w.milestone}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
