import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Heart, Brain, Zap, Shield, Activity, Droplets, Info as InfoIcon, AlertTriangle, CheckCircle, Moon, Sun } from 'lucide-react';

const getInitialDarkMode = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
  }
  return true; // default to dark
};

const ResFreqAnalyzer = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedMechanism, setSelectedMechanism] = useState(null);
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showFullReport, setShowFullReport] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = e.target.value;
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const mechanisms = [
    {
      id: 'hrv',
      icon: Heart,
      title: 'Heart Rate Variability (HRV)',
      subtitle: 'Autonomic Nervous System Modulation',
      description: 'The jewelry\'s stable oscillatory frequency could act as a fixed reference signal for the Autonomic Nervous System (ANS), similar to how natural electromagnetic fields like the Schumann Resonance provide a continuous brain frequency matching signal. This external reference may promote entrainment (induced synchronization) of autonomic rhythms, potentially leading to improvements in Heart Rate Variability (HRV)—a robust indicator of parasympathetic activity and physiological resilience. Research on analogous technologies like Pulsed Electromagnetic Field (PEMF) therapy has shown to induce a significant parasympathetic response, increasing HRV, suggesting how McCutcheon\'s jewelry could contribute to similar benefits.',
      evidence: 'Clinical trial with similar technology (Harmoni Pendant, n=101) showed ~700% increase in HRV Index, +310% enhancement of autonomic regulation, and –48% reduction in stress index.',
      analogy: 'Like a metronome helping musicians stay in rhythm, the stable frequency may help your heart maintain healthy variability patterns.',
      established: 'PEMF therapy and resonance frequency breathing consistently show HRV improvements in peer-reviewed studies.'
    },
    {
      id: 'neural',
      icon: Brain,
      title: 'Neural & Physiological Entrainment',
      subtitle: 'Brainwave & System Synchronization',
      description: 'The jewelry\'s stable oscillatory frequency could align with principles of brainwave entrainment, autonomic resonance, and neurophysiological coherence. The embedded frequencies might synchronize with endogenous brain rhythms such as alpha waves (8–12 Hz) and baroreflex oscillations (around 0.1 Hz), potentially functioning as a neural pacemaker. This entrainment could support emotional well-being, cognitive clarity, and circadian regulation, mirroring effects observed in neurofeedback training and studies on Schumann Resonance.',
      evidence: 'EEG data indicate that human brain rhythms show transient coherence with Schumann harmonics (7–8, 13–14 Hz).',
      analogy: 'Like tuning a radio to a clear station, the jewelry may help your brain and body tune into healthy rhythms.',
      established: 'Neurofeedback, Schumann Resonance, and resonance breathing demonstrate frequency-based neural influence.'
    },
    {
      id: 'emf',
      icon: Shield,
      title: 'EMF Buffering',
      subtitle: 'Electromagnetic Noise Protection',
      description: 'By providing a stable frequency environment near the body, the jewelry may buffer or mitigate the disruptive effects of ambient electromagnetic fields (EMFs) prevalent in modern environments, which are documented to negatively impact autonomic balance. The jewelry may offer a stabilizing reference, offsetting the erratic nature of environmental EMFs and supporting cellular ion channel homeostasis and oxidative stress reduction.',
      evidence: 'Studies show WiFi exposure (2.4 GHz) significantly decreases parasympathetic HRV markers. Protective resonant fields have reversed EMF-induced HRV and cortisol disruptions.',
      analogy: 'Like noise-canceling headphones that block out background static, the jewelry may help your body maintain clarity amid electromagnetic noise.',
      established: 'Research confirms chronic EMF exposure disrupts autonomic balance and cellular function; PEMF and resonant fields can buffer these effects.'
    },
    {
      id: 'balance',
      icon: Activity,
      title: 'Sensory Feedback & Balance',
      subtitle: 'Proprioception & Postural Control',
      description: 'The consistent resonance from the jewelry might offer subtle sensory input, enhancing proprioception and vestibular integration, which could lead to improved balance and postural control. Subtle, continuous resonant cues could enhance postural awareness and sensorimotor integration, operating akin to a continuous, passive biofeedback.',
      evidence: 'Skin can detect natural EMFs via resonance matching affecting sensorimotor integration. Vibratory and electromagnetic feedback systems demonstrate improved balance and proprioception.',
      analogy: 'Like a tightrope walker using a balancing pole for subtle feedback, the jewelry may provide your body with extra cues for stability.',
      established: 'Biofeedback and vibratory feedback systems show improved balance and proprioception in studies.'
    },
    {
      id: 'cellular',
      icon: Zap,
      title: 'Cellular & Molecular Effects',
      subtitle: 'Protein, DNA, and Energy Modulation',
      description: 'The jewelry\'s low-intensity electromagnetic field could interact with biological systems at a fundamental cellular and molecular level, even without generating heat. Peer-reviewed models like the Ion Forced Oscillation (IFO)-Voltage-Gated Ion Channel (VGIC) mechanism show how weak, passive EMFs can alter ion channel activity and cellular redox state. Magnetic fields can also induce conformational changes in proteins (e.g., EPG protein), directly influencing molecular function. These effects may support cellular homeostasis, DNA synthesis, and energy balance.',
      evidence: 'Studies show magnetic fields can trigger magnetic activation of split proteins and affect DNA synthesis. PEMF therapy shows documented effects on ATP production, ion channels, and cellular homeostasis.',
      analogy: 'Like a factory assembly line that runs more smoothly when everything is in sync, the jewelry may help your cells operate more efficiently.',
      established: 'PEMF therapy and biofield research document effects on cellular energetics and homeostasis.'
    },
    {
      id: 'water',
      icon: Droplets,
      title: 'Water Structuring & Frequency Transfer',
      subtitle: 'Transferable Resonance Property',
      description: 'A distinctive property attributed to the jewelry is its ability to transfer its embedded frequency to other mineral-containing materials, including water, through direct contact. Research shows that water can form structured phases (like Exclusion Zone (EZ) water and hexagonal water) that are highly responsive to electromagnetic fields. These structured forms can store and carry information, but it is important to distinguish this from the speculative concept of "water memory," which lacks scientific support. Consuming such structured water could theoretically introduce the resonant frequency internally, influencing physiological rhythms and the biofield.',
      evidence: 'Research shows magnetic fields can alter water\'s hydrogen bonding and molecular cluster formation.',
      analogy: 'Like a tuning fork making another tuning fork vibrate, the jewelry may "tune" water to carry its frequency pattern.',
      established: 'Multiple studies confirm electromagnetic fields can influence water molecular structure.'
    }
  ];

  const comparisons = [
    {
      therapy: 'PEMF Therapy',
      similarity: 'Uses electromagnetic fields for therapeutic benefit. PEMF therapy has consistently demonstrated positive physiological effects, including stress mitigation and autonomic balance restoration.',
      difference: 'PEMF uses pulsed fields; McCutcheon\'s uses continuous embedded frequencies. PEMF is often used in clinical settings, while McCutcheon\'s is wearable and passive. PEMF is FDA-approved for certain conditions and has demonstrated anti-inflammatory effects and the ability to promote tissue regeneration and cellular upregulation.',
      evidence: 'Extensive clinical research showing autonomic benefits, pain reduction, anti-inflammatory effects, tissue regeneration, and increased HRV.'
    },
    {
      therapy: 'Schumann Resonance & Grounding/Earthing',
      similarity: 'Both expose the body to the Earth\'s natural electromagnetic environment, including the Schumann resonance frequencies (~7.83 Hz). Grounding (earthing) practices and exposure to Schumann Resonance are associated with improved HRV, reduced stress, and synchronization of brain and heart rhythms.',
      difference: 'Schumann Resonance refers to a specific set of global electromagnetic frequencies in the atmosphere; grounding/earthing is the practice of direct contact with the Earth, which exposes you to these frequencies and the Earth\'s electric potential. McCutcheon\'s provides a portable, consistent frequency exposure, independent of location or environment.',
      evidence: 'Research shows grounding and Schumann Resonance exposure improve HRV and reduce stress markers. Long-term monitoring revealed HRV cycles in humans sometimes correlate with Schumann resonance.'
    },
    {
      therapy: 'Biofeedback Training',
      similarity: 'Provides continuous physiological cues for self-regulation. Biofeedback is well-established for improving HRV and autonomic balance.',
      difference: 'McCutcheon\'s works passively without conscious effort, while biofeedback requires active participation and monitoring. Bioresonance Therapy (BRT) is an alternative modality that processes the body\'s electromagnetic information and has shown benefits for pain, sleep, immune response, and mental health. BRT devices operate passively and have demonstrated measurable physiological effects in peer-reviewed studies.',
      evidence: 'Well-established for improving HRV and autonomic balance in clinical studies. BRT has shown benefits for pain, sleep, immune response, and mental health.'
    },
    {
      therapy: 'Resonance Frequency Breathing',
      similarity: 'Resonance breathing techniques produce steady oscillations near 0.1 Hz, improving autonomic function and emotional regulation. This is mechanistically similar to the hypothesized effects of McCutcheon\'s jewelry, which may provide a constant external resonance to influence physiological rhythms.',
      difference: 'Resonance breathing is an active, conscious practice, while McCutcheon\'s jewelry is passive and wearable.',
      evidence: 'Resonance breathing reliably increases HRV and vagal tone, and supports emotional resilience.'
    },
    {
      therapy: 'Distant Biofield Healing',
      similarity: 'Non-contact, passive interaction that can transmit information and elicit physiological responses at a distance. Both distant biofield healing and McCutcheon\'s jewelry are hypothesized to interact with the body\'s biofield.',
      difference: 'Distant biofield healing is typically performed by a practitioner and is more speculative; McCutcheon\'s jewelry is a physical, wearable technology.',
      evidence: 'Studies report significant improvements in psychological and mental health symptoms from distant biofield healing.'
    },
    {
      therapy: 'Sound Frequency Therapy (432 Hz, 440 Hz, etc.)',
      similarity: 'Both sound frequency therapy and resonant frequency jewelry rely on the principle that specific frequencies can influence biological systems, including water structuring and cellular function.',
      difference: 'Sound therapy uses audible vibrations, while the jewelry uses passive electromagnetic fields at specific frequencies, sometimes overlapping with those used in sound therapy. The jewelry does not produce sound but may interact with the body\'s electromagnetic field at similar frequencies.',
      evidence: 'Studies show that both sound and electromagnetic frequencies can induce changes in water structure and potentially affect biological processes. Research on 432 Hz and 440 Hz frequencies demonstrates frequency-specific effects on water and biomolecular structures.'
    },
    {
      therapy: 'Electrotherapy (TENS, Direct Electrical Stimulation)',
      similarity: 'Both aim to influence biological processes using electromagnetic phenomena and are used for wellness or therapeutic purposes.',
      difference: 'Electrotherapy uses direct electrical currents for acute stimulation (e.g., pain relief), while the jewelry uses passive, non-thermal fields for gentle, ongoing support. The jewelry is explicitly designed to avoid direct electrical stimulation, focusing on resonance and subtle field effects.',
      evidence: 'Electrotherapy is well-established for pain management and rehabilitation, but operates through direct current application. The jewelry operates through passive resonance, with no direct current applied to the body.'
    },
    {
      therapy: 'Mora Nova and Electromagnetic Information Processing Devices',
      similarity: 'Devices like Mora Nova process the body\'s electromagnetic information to support health, similar to the jewelry\'s aim of interacting with the biofield.',
      difference: 'Mora Nova uses electrodes and active measurement/processing, while the jewelry is passive and wearable. Mora Nova operates as an electromagnetic transceiver, while the jewelry provides a continuous passive field.',
      evidence: 'Peer-reviewed studies show benefits for pain, sleep, immune response, and mental health from such information-processing devices. The jewelry is theorized to work by influencing the informational aspects of the body\'s biofield.'
    },
    {
      therapy: 'Harmoni Pendant (Frequency-Embedded Pendant Technology)',
      similarity: 'Both the Harmoni Pendant and McCutcheon\'s jewelry use advanced proprietary processes to embed stable frequencies in wearable materials, providing continuous, passive biofield support. Both are designed to influence physiological rhythms, autonomic balance, and overall well-being through non-thermal electromagnetic resonance, and represent leading-edge approaches in frequency-based wellness.',
      difference: 'While both technologies share similar principles, each uses its own proprietary frequency profiles, materials, and embedding methods. The Harmoni Pendant has published clinical trial data, while McCutcheon\'s jewelry is based on the latest scientific understanding and is actively engaged in ongoing research to further validate and expand its unique benefits. Both are at the forefront of innovation in this field.',
      evidence: 'A clinical trial with the Harmoni Pendant (n=101) demonstrated a ~700% increase in HRV Index, +310% enhancement of autonomic regulation, and –48% reduction in stress index, supporting the potential for frequency-embedded wearables to impact physiological resilience and stress. McCutcheon\'s jewelry is expected to contribute further evidence as research progresses.'
    }
  ];

  const faqs = [
    {
      question: 'Is this scientifically proven?',
      answer: 'McCutcheon\'s technology has shown promising results in in-house double-blind experiments, indicating effects beyond placebo. However, peer-reviewed clinical trials are still needed for full scientific validation. The proposed mechanisms are based on established research in related fields like PEMF therapy, biofield science, and resonance frequency devices. While clinical trials with analogous technology (such as the Harmoni Pendant) have shown significant improvements in HRV and stress, more independent, large-scale studies are required to confirm these findings and establish the technology\'s efficacy and safety for the general population.',
      icon: AlertTriangle,
      type: 'caution'
    },
    {
      question: 'How does it compare to proven therapies?',
      answer: 'McCutcheon\'s jewelry shares mechanisms with established therapies like PEMF (Pulsed Electromagnetic Field) therapy, biofeedback training, and grounding. These therapies have extensive clinical research supporting their benefits for autonomic balance, stress reduction, and overall well-being. However, McCutcheon\'s approach of embedding frequencies in wearable materials is unique. Unlike active therapies that require conscious participation or clinical settings, this jewelry is passive, portable, and designed for continuous use. More research is needed to directly compare its effectiveness to these established therapies.',
      icon: CheckCircle,
      type: 'info'
    },
    {
      question: 'What makes the frequency "stick" to materials?',
      answer: 'The proprietary process is believed to use a combination of electromagnetic and/or mechanical conditioning to induce stable vibrational modes in the mineral matrix of the material. This is somewhat analogous to how crystals can be programmed to oscillate at specific frequencies in electronic devices. The result is a semi-permanent resonance that remains embedded in the material, allowing it to emit a continuous, passive oscillatory field at the programmed frequency. This process is not fully disclosed due to its proprietary nature, but it is designed to ensure long-lasting frequency retention.',
      icon: InfoIcon,
      type: 'info'
    },
    {
      question: 'Can it really transfer frequency to water?',
      answer: 'Research in biophysics and water science shows that electromagnetic fields can influence water\'s molecular structure, hydrogen bonding, and the formation of larger, more ordered clusters. The jewelry is said to transfer its resonant frequency to water through direct contact, a process sometimes called "imprinting." While this suggests frequency transfer is plausible, the biological significance of consuming such structured water is still under investigation. More research is needed to determine how long the frequency persists in water and what physiological effects, if any, it may have when consumed.',
      icon: InfoIcon,
      type: 'info'
    },
    {
      question: 'Are there any safety concerns or risks of adverse effects?',
      answer: 'The jewelry emits very weak, non-thermal fields, similar in intensity to natural environmental EMFs and much weaker than those produced by electronic devices or medical equipment. No adverse effects have been reported in in-house testing, and the fields are considered safe for the general population. However, as with any wellness product, individual responses may vary. People with implanted electronic devices (like pacemakers), children, pregnant women, or those with specific health conditions should consult a healthcare professional before use.',
      icon: Shield,
      type: 'info'
    },
    {
      question: 'How long does the frequency last in materials?',
      answer: "The embedded resonance is described as 'semi-permanent.' It should last for extended periods, potentially years, depending on the material type, environmental factors, and how the jewelry is handled. The process is designed to ensure long-lasting frequency retention, but the exact duration and stability have not been fully quantified in published studies. Over time, factors such as wear, exposure to strong electromagnetic fields, or physical damage could potentially diminish the resonance. The jewelry's ability to transfer its frequency to other materials, including water, is a unique property that may also persist for extended periods, but more research is needed to determine the precise longevity of these effects.",
      icon: InfoIcon,
      type: 'info'
    },
    {
      question: 'What is the biofield and how does the jewelry interact with it?',
      answer: 'The biofield is a term used to describe the complex electromagnetic and energetic environment generated by living organisms, including humans. It encompasses endogenous bioelectric and biomagnetic fields produced by cellular activity, nerve impulses, and other biological processes. The jewelry is theorized to act as a bioactive stimulus, subtly interacting with the wearer\'s biofield through electromagnetic resonance. This interaction may help synchronize physiological rhythms, support autonomic balance, and promote overall well-being, though the exact mechanisms are still being explored in scientific research.',
      icon: Brain,
      type: 'info'
    },
    {
      question: 'What scientific evidence supports the mechanisms?',
      answer: 'There is a growing body of scientific literature supporting the plausibility of the mechanisms described for McCutcheon\'s jewelry. Clinical trials with analogous technology have shown dramatic improvements in HRV and stress index. PEMF therapy, resonance breathing, and studies on Schumann Resonance all provide evidence that external electromagnetic fields can influence autonomic function, brainwave activity, and physiological resilience. However, more independent, peer-reviewed research is needed to specifically validate the effects of McCutcheon\'s technology.',
      icon: CheckCircle,
      type: 'info'
    },
    {
      question: 'Can the jewelry help with EMF exposure?',
      answer: "The jewelry is designed to provide a stable frequency environment near the body, which may help buffer or mitigate the disruptive effects of ambient electromagnetic fields (EMFs) from sources like WiFi, cell phones, and power lines. Some studies suggest that protective resonant fields can reverse EMF-induced disruptions in heart rate variability and stress markers. While the jewelry's passive field is much weaker than those produced by electronic devices, it may offer a stabilizing reference for the body's electrical systems. More research is needed to confirm the extent of this protective effect in real-world settings.",
      icon: Shield,
      type: 'info'
    },
    {
      question: 'What future research is needed?',
      answer: 'Further controlled, independent research is needed to fully validate the efficacy and safety of McCutcheon\'s jewelry. This includes clinical trials measuring balance metrics, HRV, EEG, and biochemical markers after exposure to frequency-infused materials. Long-term studies should also assess the durability of the embedded frequency and its effects over time. Collaboration with academic institutions and publication in peer-reviewed journals will be crucial for establishing scientific credibility and understanding the full range of potential benefits and limitations.',
      icon: InfoIcon,
      type: 'info'
    },
    {
      question: 'What is the Ion Forced Oscillation (IFO)-Voltage-Gated Ion Channel (VGIC) mechanism?',
      answer: 'This is a leading scientific model explaining how weak, passive electromagnetic fields can influence biological systems. It proposes that low-frequency EMFs can force ions in cell membrane channels to oscillate in parallel and in phase, amplifying their effect on the voltage sensors of the channels. This can alter the opening and closing of the channels, affecting cellular signaling, oxidative stress, and physiological balance. The IFO-VGIC mechanism is supported by peer-reviewed research and is considered a plausible pathway for how subtle electromagnetic fields, like those from the jewelry, could impact biological function at the cellular level.',
      icon: Brain,
      type: 'info'
    },
    {
      question: 'How does the jewelry interact with water in the body?',
      answer: 'Research suggests that passive magnetic fields and resonant frequencies can alter water\'s molecular structure, hydrogen bonding, and cluster formation. The jewelry may "imprint" its frequency onto water, potentially allowing the frequency to be carried internally and influence physiological rhythms. This process, sometimes called water structuring, is thought to enhance water\'s ability to support cellular communication and energy transfer. While the biological significance of consuming such structured water is still under investigation, it is a promising area of research for understanding how frequency-based technologies might exert systemic effects.',
      icon: Droplets,
      type: 'info'
    },
    {
      question: 'What is "structured water" and why is it important?',
      answer: 'Structured water refers to water with a more ordered molecular arrangement, such as hexagonal or Exclusion Zone (EZ) water. These forms are thought to be more responsive to electromagnetic fields and may play a role in cellular communication, energy transfer, and the propagation of bioelectric signals within the body. Structured water is believed to facilitate more efficient hydration, nutrient transport, and waste removal at the cellular level. The ability of the jewelry to influence water structure could therefore have wide-ranging implications for health and wellness, although more research is needed to fully understand these effects.',
      icon: Droplets,
      type: 'info'
    },
    {
      question: 'How does the jewelry interact with the body\'s biofield?',
      answer: 'The jewelry is theorized to act as a bioactive stimulus, subtly interacting with the wearer\'s biofield through electromagnetic resonance. This may help synchronize physiological rhythms, support autonomic balance, and promote overall well-being. The exact mechanisms are still being explored, but the concept is supported by emerging research in bioelectromagnetics and biophysics.',
      icon: Brain,
      type: 'info'
    },
    {
      question: 'What are the main scientific limitations and open questions?',
      answer: 'While the mechanisms are plausible and supported by analogous research, direct, peer-reviewed clinical trials on this specific jewelry are still needed. The field faces challenges in reproducibility, standardization, and understanding the full range of biological effects. Ongoing research is essential to establish efficacy, safety, and best practices for frequency-based wellness technologies.',
      icon: AlertTriangle,
      type: 'caution'
    },
    {
      question: 'Can the jewelry be used with other wellness modalities?',
      answer: 'There are no known contraindications for combining the jewelry with other wellness practices such as meditation, grounding, or PEMF therapy. In fact, some users may find synergistic benefits from integrating multiple approaches. However, always consult a healthcare professional for personalized advice, especially if you have underlying health conditions or are using medical devices.',
      icon: CheckCircle,
      type: 'info'
    },
    {
      question: 'How long does it take to notice effects from the jewelry?',
      answer: 'Individual responses vary. Some users report immediate subtle sensations, such as increased calm or focus, while others may notice benefits over days or weeks of consistent use. The jewelry is designed for gentle, ongoing support, and effects may accumulate gradually. For best results, wear the jewelry regularly and pay attention to subtle changes in well-being.',
      icon: InfoIcon,
      type: 'info'
    },
    {
      question: 'How long does the jewelry\'s frequency last, and can it lose its effect over time?',
      answer: "The embedded resonance is described as 'semi-permanent.' It should last for extended periods, potentially years, depending on the material type, handling, and environmental exposure. The process is designed to ensure long-lasting frequency retention, but the exact duration and stability have not been fully quantified in published studies. Over time, factors such as wear, exposure to strong electromagnetic fields, or physical damage could potentially diminish the resonance. To maximize longevity, avoid exposing the jewelry to strong electromagnetic fields, extreme temperatures, or physical damage. The jewelry's ability to transfer its frequency to other materials, including water, is a unique property that may also persist for extended periods, but more research is needed to determine the precise longevity of these effects.",
      icon: InfoIcon,
      type: 'info'
    },
    {
      question: 'What is the significance of frequency specificity?',
      answer: 'Biological effects of electromagnetic fields are highly frequency-specific, meaning that only certain frequencies will interact with particular biological systems or processes. The jewelry is designed to emit precise frequencies that may target specific physiological responses, similar to how Schumann Resonance or PEMF therapy works. This specificity is crucial for safety and efficacy, as the wrong frequency could have no effect or even unintended consequences. Frequency-specific effects are a key area of research in bioelectromagnetics and underpin the rationale for frequency-embedded wellness technologies.',
      icon: Activity,
      type: 'info'
    },
    {
      question: 'Can the jewelry influence protein function or gene expression?',
      answer: 'Recent research shows that weak magnetic fields can induce conformational changes in proteins, such as the electromagnetic perceptive gene (EPG) protein, and may influence gene expression by altering cellular signaling pathways. While direct evidence for the jewelry\'s effects on protein function or gene expression is still pending, these mechanisms provide a plausible scientific basis for its potential impact. Such effects could support cellular homeostasis, DNA synthesis, and energy balance, contributing to the jewelry\'s overall wellness claims.',
      icon: Zap,
      type: 'info'
    },
    {
      question: 'What is the difference between "water imprinting" and "water memory"?',
      answer: 'Water imprinting refers to the plausible, temporary structuring of water by electromagnetic fields, as supported by some research. This process may allow water to carry frequency information for a limited time, potentially influencing biological systems when consumed. "Water memory," on the other hand, is the idea that water retains information about substances long after dilution, a concept widely considered pseudoscientific and not claimed by this technology. The jewelry focuses on scientifically plausible mechanisms of water structuring, not unsupported claims of long-term memory.',
      icon: AlertTriangle,
      type: 'caution'
    },
    {
      question: 'How does the jewelry compare to PEMF and Bioresonance Therapy?',
      answer: 'PEMF (Pulsed Electromagnetic Field) and Bioresonance Therapy are established modalities using electromagnetic fields for therapeutic benefit. PEMF is often used in clinical settings and delivers pulsed fields for acute or chronic conditions, while Bioresonance Therapy processes the body\'s electromagnetic information to support health. The jewelry is passive, wearable, and continuous, providing a steady frequency exposure throughout the day. All rely on frequency-specific effects, but the jewelry is unique in its portability, passive design, and focus on gentle, ongoing support rather than acute intervention.',
      icon: Activity,
      type: 'info'
    },
    {
      question: 'Can the jewelry help with pain, inflammation, or tissue regeneration?',
      answer: 'While direct clinical evidence for the jewelry is pending, analogous technologies like PEMF have shown benefits for pain, inflammation, and tissue healing in peer-reviewed studies. The jewelry\'s mechanisms are theoretically similar, involving the modulation of cellular signaling, reduction of oxidative stress, and support for tissue repair. However, more research is needed to confirm these effects specifically for the jewelry, and it should not be considered a substitute for medical treatment.',
      icon: CheckCircle,
      type: 'info'
    },
    {
      question: 'What is "cellular upregulation" and could the jewelry promote it?',
      answer: 'Cellular upregulation refers to enhanced cellular function, activity, or regeneration in response to specific stimuli. Research suggests that structured water and resonant frequencies can support cellular upregulation by facilitating energy transfer, improving nutrient absorption, and promoting tissue repair. The jewelry may contribute to these effects by providing a stable, supportive frequency environment, but more research is needed to fully understand its impact on cellular processes.',
      icon: Zap,
      type: 'info'
    },
    {
      question: 'Why is reproducibility a challenge in this field?',
      answer: 'Results in bioelectromagnetics can vary due to differences in field intensity, frequency, waveform, exposure duration, and even environmental factors such as water composition. These variables make it difficult to standardize experiments and compare results across studies. Rigorous, well-controlled research and transparent reporting are essential for advancing scientific understanding and product credibility in this complex field.',
      icon: AlertTriangle,
      type: 'caution'
    },
    {
      question: 'Can the jewelry affect mental clarity or emotional balance?',
      answer: 'Theoretically, by supporting autonomic balance and brainwave coherence, the jewelry may help with mental clarity, emotional regulation, and stress resilience. This is based on research into biofield effects, resonance with brain rhythms, and the observed benefits of analogous technologies like neurofeedback and Schumann Resonance exposure. Individual experiences may vary, and more research is needed to quantify these effects.',
      icon: Brain,
      type: 'info'
    },
    {
      question: 'How does the jewelry interact with the body\'s biofield?',
      answer: 'The jewelry is theorized to act as a bioactive stimulus, subtly interacting with the wearer\'s biofield through electromagnetic resonance. This may help synchronize physiological rhythms, support autonomic balance, and promote overall well-being. The exact mechanisms are still being explored, but the concept is supported by emerging research in bioelectromagnetics and biophysics.',
      icon: Brain,
      type: 'info'
    },
    {
      question: 'What are the main scientific limitations and open questions?',
      answer: 'While the mechanisms are plausible and supported by analogous research, direct, peer-reviewed clinical trials on this specific jewelry are still needed. The field faces challenges in reproducibility, standardization, and understanding the full range of biological effects. Ongoing research is essential to establish efficacy, safety, and best practices for frequency-based wellness technologies.',
      icon: AlertTriangle,
      type: 'caution'
    },
    {
      question: 'Can the jewelry be used with other wellness modalities?',
      answer: 'There are no known contraindications for combining the jewelry with other wellness practices such as meditation, grounding, or PEMF therapy. In fact, some users may find synergistic benefits from integrating multiple approaches. However, always consult a healthcare professional for personalized advice, especially if you have underlying health conditions or are using medical devices.',
      icon: CheckCircle,
      type: 'info'
    },
    {
      question: 'How long does it take to notice effects from the jewelry?',
      answer: 'Individual responses vary. Some users report immediate subtle sensations, such as increased calm or focus, while others may notice benefits over days or weeks of consistent use. The jewelry is designed for gentle, ongoing support, and effects may accumulate gradually. For best results, wear the jewelry regularly and pay attention to subtle changes in well-being.',
      icon: InfoIcon,
      type: 'info'
    },
    {
      question: 'How long does the jewelry\'s frequency last, and can it lose its effect over time?',
      answer: "The embedded resonance is described as 'semi-permanent.' It should last for extended periods, potentially years, depending on the material type, handling, and environmental exposure. The process is designed to ensure long-lasting frequency retention, but the exact duration and stability have not been fully quantified in published studies. Over time, factors such as wear, exposure to strong electromagnetic fields, or physical damage could potentially diminish the resonance. To maximize longevity, avoid exposing the jewelry to strong electromagnetic fields, extreme temperatures, or physical damage. The jewelry's ability to transfer its frequency to other materials, including water, is a unique property that may also persist for extended periods, but more research is needed to determine the precise longevity of these effects.",
      icon: InfoIcon,
      type: 'info'
    }
  ];

  // Ensure returning to overview resets showFullReport
  const handleTabClick = (section) => {
    setActiveSection(section);
    if (section === 'overview') setShowFullReport(false);
  };

  useEffect(() => {
    if (showFullReport && activeSection === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (!showFullReport && activeSection === 'overview') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showFullReport, activeSection]);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300`}>
      {/* Hidden persistent audio element */}
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}Audio/podcast.wav`}
        preload="metadata"
        style={{ display: 'none' }}
      />
      <div className="container mx-auto px-4 py-8 relative">
        {/* Dark mode toggle */}
        <button
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow"
          aria-label="Toggle dark mode"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <Moon className="w-5 h-5 text-yellow-300" /> : <Sun className="w-5 h-5 text-yellow-500" />}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{darkMode ? 'Dark' : 'Light'} Mode</span>
        </button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 max-w-2xl mx-auto">
            The Science & Potential Benefits of Resonant Frequency Jewelry
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-prose mx-auto">
            Explore how McCutcheon's jewelry technology might interact with your body's natural systems
          </p>
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-700 rounded-lg max-w-4xl mx-auto">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Important:</strong> This analysis explores plausible mechanisms based on existing research. 
              While in-house studies show promise, peer-reviewed clinical trials are needed for full scientific validation.
            </p>
          </div>
        </div>

        {/* Persistent Now Playing Widget (if not on overview) */}
        {isPlaying && activeSection !== 'overview' && (
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg shadow bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700">
              <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">Now Playing:</span>
              <span className="text-sm text-gray-800 dark:text-gray-100 truncate max-w-xs" title="Podcast Deep Dive: Full Report Discussion">
                Podcast Deep Dive: Full Report Discussion
              </span>
              <button
                onClick={handlePlayPause}
                className="ml-2 px-3 py-1 rounded bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 font-medium text-xs shadow hover:bg-blue-700 dark:hover:bg-blue-500 focus:outline-none"
                aria-label={isPlaying ? 'Pause podcast' : 'Play podcast'}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {["overview", "mechanisms", "comparisons", "faq"].map((section) => (
            <button
              key={section}
              onClick={() => handleTabClick(section)}
              className={`px-6 py-3 rounded-lg font-medium transition-all
                ${activeSection === section
                  ? 'bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900 shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {activeSection === 'overview' && (
          <div className="max-w-4xl mx-auto">
            {!showFullReport ? (
              <>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mb-8 transition-colors">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">How Might It Work?</h2>
                  {/* Podcast Deep Dive Section - controls only visible in overview */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-pink-700 dark:text-pink-300 mb-2">🎧 Podcast Deep Dive: Full Report Discussion</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      Listen to an in-depth audio walkthrough of the detailed report, exploring the science, mechanisms, and real-world implications of McCutcheon's Resonant Frequency Jewelry.
                    </p>
                    <div className="flex flex-col gap-2 items-center">
                      <div className="flex items-center gap-4 w-full">
                        <button
                          onClick={handlePlayPause}
                          className={`px-4 py-2 rounded-lg font-medium shadow transition-colors focus:outline-none
                            ${isPlaying ? 'bg-red-600 text-white dark:bg-red-400 dark:text-gray-900' : 'bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900'}`}
                          aria-label={isPlaying ? 'Pause podcast' : 'Play podcast'}
                        >
                          {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button
                          onClick={handleStop}
                          className="px-4 py-2 rounded-lg font-medium shadow bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none"
                          aria-label="Stop podcast"
                        >
                          Stop
                        </button>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full accent-blue-600 dark:accent-blue-400"
                        step="any"
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">The Technology</h3>
                      <p className="text-gray-700 dark:text-gray-200">
                        McCutcheon's proprietary process uses a combination of electromagnetic and subtle mechanical conditioning to embed stable resonant frequencies into a wide range of mineral-containing materials. Unlike traditional frequency devices that rely on specific crystals, this method induces and stabilizes vibrational modes within the material's mineral matrix, resulting in a semi-permanent resonance. This resonance is believed to emit a continuous, passive oscillatory field at the programmed frequency, potentially interacting with the body's biofield—a scientifically recognized electromagnetic environment generated by cellular and neural activity.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/40 p-4 rounded-lg">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Transferable Resonance:</strong> A unique property of this technology is its ability to transfer its embedded frequency to other mineral-containing materials, including water, through direct contact. Research suggests that such exposure can alter water's molecular structure, hydrogen bonding, and cluster formation, potentially allowing the frequency to be "imprinted" and carried internally when consumed.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">The Science</h3>
                      <p className="text-gray-700 dark:text-gray-200">
                        The embedded frequencies may interact with your body's "biofield"—the complex electromagnetic environment generated by cellular activity, nerve impulses, and other biological processes. The biofield is an active area of research, with growing evidence suggesting its electromagnetic nature, involving endogenous bioelectric and biomagnetic fields. The jewelry's fixed-frequency field could subtly influence biological systems through electromagnetic resonance, aligning with the idea of an "external field" causing "induced synchronization" as a flow of information to the body.
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/40 p-4 rounded-lg">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          <strong>How Do We Know Biofields Exist?</strong> Modern technologies like MEG (magnetoencephalogram) and SQUID (Superconducting Quantum Interference Device) can detect the body's faint biomagnetic fields. Unlike electric signals, magnetic fields pass through tissues with little distortion, supporting the plausibility that passive magnetic fields from jewelry could interact with internal biological processes.
                        </p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/40 p-4 rounded-lg">
                        <p className="text-sm text-orange-800 dark:text-orange-200">
                          <strong>Scientific Rigor:</strong> This site distinguishes between plausible science (e.g., water structuring, biofield, ion channel effects) and speculative concepts (e.g., "water memory"). While structured water and biofield effects are supported by emerging research, claims like water memory remain unproven and are not part of our scientific foundation.
                        </p>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/40 p-4 rounded-lg">
                        <div className="text-sm text-purple-800 dark:text-purple-200">
                          <strong>Clinical & Scientific Evidence:</strong>
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Clinical trials with analogous technology (Harmoni Pendant) demonstrated a ~700% increase in HRV Index, +310% enhancement of autonomic regulation, and –48% reduction in stress index.</li>
                            <li>PEMF therapy and resonance breathing studies consistently show improvements in HRV and autonomic balance.</li>
                            <li>Exposure to Schumann Resonance frequencies has been linked to improved sleep and brainwave coherence.</li>
                            <li>Protective resonant fields have reversed EMF-induced HRV and cortisol disruptions in controlled experiments.</li>
                            <li>Magnetic and electromagnetic fields can alter water's hydrogen bonding and cluster size, potentially allowing it to carry frequency information.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2 mt-12">How the Resonant Frequency Jewelry Works: Step-by-Step</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">1. Frequency Embedding</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-200">Using a proprietary process, stable resonant frequencies are embedded into the jewelry's mineral matrix, creating a semi-permanent, passive oscillatory field unique to each piece.</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">2. Continuous Resonance</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-200">Once worn, the jewelry emits a subtle, continuous frequency field. This field is always present, providing a steady energetic environment around the wearer.</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">3. Biofield Interaction & Entrainment</h4>
                      <p className="text-sm text-green-700 dark:text-green-200">The body's biofield—its natural electromagnetic environment—can interact with the jewelry's frequency. This may promote entrainment, where the body's rhythms (like heart rate variability and brainwaves) synchronize with the jewelry's stable signal, supporting autonomic balance and cognitive clarity.</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">4. Physiological Stabilization</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-200">As the body entrains to the jewelry's frequency, physiological systems may stabilize—stress is reduced, emotional well-being is supported, and resilience to environmental stressors is enhanced.</p>
                    </div>
                    <div className="bg-pink-50 dark:bg-pink-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-1">5. Balance & Proprioceptive Support</h4>
                      <p className="text-sm text-pink-700 dark:text-pink-200">Subtle electromagnetic cues from the jewelry may enhance proprioception and postural control, helping the wearer feel more balanced and physically stable.</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-1">6. EMF Buffering</h4>
                      <p className="text-sm text-orange-700 dark:text-orange-200">The jewelry's stable field may help buffer or mitigate the disruptive effects of ambient electromagnetic fields (EMFs), providing a reference signal that supports cellular and electrical stability.</p>
                    </div>
                    <div className="bg-cyan-50 dark:bg-cyan-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-cyan-800 dark:text-cyan-200 mb-1">7. Frequency Transfer to Water</h4>
                      <p className="text-sm text-cyan-700 dark:text-cyan-200">A unique property: the jewelry can transfer its frequency to water and other minerals through direct contact. This "imprinted" water may carry the frequency internally, potentially extending the jewelry's influence throughout the body.</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900 font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                    onClick={() => setShowFullReport(true)}
                  >
                    View Full Report
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 mt-4 overflow-x-auto">
                <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Full Detailed Report</h2>
                <FullReportContent />
                <div className="flex justify-center mt-8">
                  <button
                    className="px-6 py-3 rounded-lg bg-blue-600 text-white dark:bg-blue-400 dark:text-gray-900 font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                    onClick={() => setShowFullReport(false)}
                  >
                    Back to Overview
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === 'mechanisms' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Biological Interaction Mechanisms</h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              {mechanisms.map((mechanism) => {
                const IconComponent = mechanism.icon;
                const isExpanded = selectedMechanism === mechanism.id;
                return (
                  <div
                    key={mechanism.id}
                    className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl relative ${
                      isExpanded ? 'ring-2 ring-blue-500 dark:ring-blue-300' : ''
                    }`}
                    onClick={() => setSelectedMechanism(isExpanded ? null : mechanism.id)}
                  >
                    <div className="flex items-center mb-4 justify-between">
                      <div className="flex items-center">
                        <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-300 mr-3" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{mechanism.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{mechanism.subtitle}</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-300 ml-2" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-300 ml-2" />
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">{mechanism.description}</p>
                    {isExpanded && (
                      <div className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="bg-blue-50 dark:bg-blue-900/40 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Research Evidence</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-200">{mechanism.evidence}</p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/40 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Established Science</h4>
                          <p className="text-sm text-purple-700 dark:text-purple-200">{mechanism.established}</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/40 p-4 rounded-lg">
                          <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Simple Analogy</h4>
                          <p className="text-sm text-orange-700 dark:text-orange-200">{mechanism.analogy}</p>
                        </div>
                      </div>
                    )}
                    {/* Three-dot ellipsis indicator when collapsed, anchored to bottom center */}
                    {!isExpanded && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex justify-center w-full pointer-events-none">
                        <div className="flex space-x-1">
                          <span className="inline-block w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
                          <span className="inline-block w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
                          <span className="inline-block w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === 'comparisons' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Comparison to Established Therapies</h2>
            <div className="space-y-6">
              {comparisons.map((comp, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">{comp.therapy}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Similarity</h4>
                      <p className="text-sm text-green-700 dark:text-green-200">{comp.similarity}</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Key Difference</h4>
                      <p className="text-sm text-orange-700 dark:text-orange-200">{comp.difference}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/40 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Evidence Base</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-200">{comp.evidence}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const IconComponent = faq.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg">
                    <button
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <div className="flex items-center">
                        <IconComponent className={`w-6 h-6 mr-3 ${faq.type === 'caution' ? 'text-yellow-600 dark:text-yellow-300' : 'text-blue-600 dark:text-blue-300'}`} />
                        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">{faq.question}</span>
                      </div>
                      {expandedFAQ === index ? (
                        <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-300" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-orange-50 dark:bg-orange-900/40 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Scientific Standards & Research Challenges</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              The field of bioelectromagnetics faces challenges in reproducibility and standardization. Results can vary due to differences in field intensity, frequency, exposure duration, and even water composition. Rigorous, well-controlled studies and transparent reporting are essential for advancing scientific understanding and product credibility.
            </p>
          </div>
          <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 max-w-3xl mx-auto">
            <p className="text-xs text-gray-600 dark:text-gray-300 text-center">
              <strong>Disclaimer:</strong> This analysis is based on established research in related fields and McCutcheon's in-house studies. The mechanisms described are plausible based on current scientific understanding, but independent peer-reviewed clinical trials are needed for definitive validation. Always consult healthcare professionals for medical advice. This technology is not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

function formatTime(time) {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

const fullReportRaw = `Detailed Report: McCutcheon's Health Products: Exploring the Mechanisms of Resonant Frequency Jewelry

1. Introduction
McCutcheon's Health Products introduces an innovative line of wearable technology presumed to embed stable resonant frequencies into a broad range of mineral-containing materials, including metals, stones, ceramics, and composites. This resonant frequency jewelry is designed to potentially support emotional well-being, autonomic balance, and physical stability through continuous bioactive resonance. While in-house double-blind experiments have indicated effects beyond placebo, further rigorous external validation is encouraged. This document explores the unique properties of McCutcheon's jewelry, outlines the biological mechanisms through which it could interact with the human body, connects these mechanisms to supporting scientific evidence from peer-reviewed research on resonant frequencies, and discusses its notable ability to transfer its resonant frequency to other materials, such as water, potentially extending its health benefits.

2. Technology and Unique Properties
McCutcheon's proprietary process is believed to embed resonant frequencies into virtually any mineral-containing material. Unlike traditional frequency devices often limited to specific piezoelectric crystals, this method involves electromagnetic and/or subtle mechanical conditioning. This conditioning is thought to induce and stabilize vibrational modes within the material's mineral matrix. The embedded resonance is considered semi-permanent, resulting in a material that may emit a continuous, passive oscillatory field at the programmed frequency. When worn, this jewelry could act as a bioactive stimulus, subtly interacting with the wearer's biological systems, potentially engaging with the body's inherent biofield—a complex organizing energy field connected with information delivery and bioregulation. The biofield is an active area of research, with growing evidence suggesting its electromagnetic nature, involving endogenous bioelectric and biomagnetic fields generated by biological processes like cellular activity and nerve impulses.
Transferable Resonance Property
A distinctive and scientifically interesting property attributed to McCutcheon's resonant frequency jewelry is its ability to transfer its embedded frequency to other mineral-containing materials through prolonged close contact. This includes the ability to imprint the resonant frequency onto water by direct contact. Research suggests that water molecules can be influenced by external electromagnetic fields, leading to changes in their molecular structure, hydrogen bonding, and the formation of larger, more ordered clusters. When water absorbs such a frequency, consuming it could potentially introduce the resonant frequency internally, influencing the body's physiological rhythms and biofield as the fluid remains within the system. This transferability may open new avenues for indirect therapeutic applications.

3. Biological Mechanisms of Action
3.1 Autonomic Nervous System Modulation via HRV 🫀
The jewelry's stable oscillatory frequency, if present and emitted, could act as a fixed reference signal for the Autonomic Nervous System (ANS). This concept is consistent with how natural electromagnetic fields (EMFs), such as the Schumann Resonance, are described as providing a continuous brain frequency matching signal, influencing the ANS. This external reference may promote entrainment (induced synchronization) of autonomic rhythms, potentially leading to improvements in Heart Rate Variability (HRV)—a robust indicator of parasympathetic activity and physiological resilience. HRV is a noninvasive method used to measure the ANS and evaluate sympatho-vagal balance; decreased global HRV is known to predict increased mortality. Research on analogous technologies like Pulsed Electromagnetic Field (PEMF) therapy has shown to induce a significant parasympathetic response, increasing HRV, suggesting how McCutcheon's jewelry could contribute to similar benefits.
3.2 Neural & Physiological Entrainment 🧠
McCutcheon's jewelry, if emitting stable oscillatory signals, could align with principles of brainwave entrainment, autonomic resonance, and neurophysiological coherence. The consistent and coherent nature of these emitted oscillations, similar to how natural phenomena like Schumann Resonance provide a globally available, ELF modulated, radiating signal, may force charged or polar molecules in biological tissue to oscillate in phase with the field. The embedded frequencies might synchronize with endogenous brain rhythms such as alpha waves (8–12 Hz) and baroreflex oscillations (around 0.1 Hz, relevant to the low-frequency component of HRV and cellular ion oscillation self-frequency), potentially functioning as a neural pacemaker. This entrainment could support emotional well-being, cognitive clarity, and circadian regulation, mirroring effects observed in neurofeedback training and studies on Schumann Resonance.
Mechanistic Insights:
Resonant Jewelry as Bioactive Stimulus: The jewelry's fixed-frequency field could subtly influence biological systems through electromagnetic resonance. This aligns with the idea of an "external field" causing "induced synchronization" as a flow of information to the body, interacting with molecules through electromagnetic resonance within the biofield.
Neurological Influence: Subtle resonances emitted near sensory organs (e.g., skin) may trigger mild proprioceptive and cortical responses, reinforcing coherence in brainwave patterns and enhancing cognitive calm or alertness. The auricular branch of the vagus nerve (ABVN) in the skin delivers information to the central ANS and can be influenced transcutaneously. EMFs can lead to "ionic flux changes" affecting the central ANS, where an "ion forced-oscillation mechanism" explains how very low-intensity polarized EMFs can irregularly gate voltage-gated ion channels. The Schumann Resonance provides a "synchronization system" for brainwave activity, and neurofeedback training aims to achieve specific brain states related to calmness or alertness by modulating brainwave patterns.
Autonomic-Neural Cross-Talk: Entrainment at neurological levels could promote deeper synchronization between brain and heart rhythms, indirectly reinforcing ANS stability through integrated neurovisceral feedback systems. This concept is supported by observations of "cardiac-induced entrainment (or frequency locking)" where physiological functions can synchronize at a distance, and by the understanding of the "biofield" as a complex organizing energy field involved in the "generation, maintenance, and regulation of biological homeodynamics," vital for biocommunication and bioregulation.
3.3 Sensory Feedback & Balance Improvement 🧍
The consistent resonance from the jewelry, if continuously present, might offer subtle sensory input, enhancing proprioception and vestibular integration, which could lead to improved balance and postural control. This section explores how subtle, continuous resonant cues—similar to those subtly emitted by McCutcheon's resonant-frequency jewelry—could enhance postural awareness and sensorimotor integration, operating akin to a continuous, passive biofeedback.
Mechanisms of Resonant Feedback & Proprioceptive Resonance:
Frequency-Sensitive Proprioception: Subtle resonant feedback, particularly at low frequencies, may enhance sensing of body position. The broader concept of biological systems interacting with electromagnetic fields (EMFs) through "resonance matching of frequency" supports this.
Improved Gait and Fall Reduction: Continuous subtle resonant fields could contribute to improved postural stability and reduced sway.
Resonance Jewelry as Continuous Subtle Cue: The jewelry's continuous resonance—primarily electromagnetic—could provide a persistent subconscious cue. This idea of a "persistent subconscious cue" via electromagnetic interaction aligns with the biofield concept, which speaks of information conveyed through very low-level energy transactions and resonant interactions. The skin can detect and respond to natural EMFs via "resonance matching," and the biofield is involved in "biocommunication." EMFs can also affect cellular ion concentrations by irregularly gating voltage-gated ion channels, further suggesting a subtle biological influence on balance and body awareness.
3.4 Electromagnetic Noise Buffering 🌐
By providing a stable frequency environment near the body, the jewelry may buffer or mitigate the disruptive effects of ambient electromagnetic fields (EMFs) prevalent in modern environments, which are documented to negatively impact autonomic balance. Human exposure to man-made EMFs has reached unprecedented levels, with wireless communication EMFs linked to genetic damage, oxidative stress, and ANS dysfunction. McCutcheon's resonant-frequency jewelry, by emitting a consistent oscillatory field, could help reduce the body's susceptibility to disruptive ambient electromagnetic fields (EMFs) by offering a stabilizing reference.
Possible Underlying Mechanisms:
Resonant Steady-State Reference: A constant oscillatory field (like the jewelry) may provide a baseline against which the body's electrical systems could stabilize, offsetting the erratic nature of environmental EMFs. This aligns with the Schumann Resonance, described as a "constant, globally available, synchronization system that continuously stabilizes the brain wave activity."
Ion Channel Homeostasis: Stable resonant fields could interact with cellular ion channels—modulating calcium, potassium, and sodium dynamics—potentially restoring cellular membrane potential and neurochemical balance disrupted by high-frequency EMF exposure. Human-made EMFs are known to disrupt electrochemical balance via an "ion forced-oscillation mechanism," while PEMF has shown to influence ion channel activity and benefit cell membrane potential, providing a precedent for the jewelry's potential action.
Oxidative Stress Reduction: EMF exposure elevates oxidative stress markers. Conversely, stable electromagnetic fields (as in PEMF therapy) have been shown to enhance antioxidant defenses and reduce free radical damage. Thus, the jewelry may offer a similar protective effect by providing a stable electromagnetic environment.
HRV Normalization: Continuous low-frequency fields support regulatory mechanisms essential for maintaining cardiac and autonomic health, as seen in HRV improvements with PEMF. This suggests the jewelry, by providing a stable resonant field, could contribute to normalizing HRV and supporting overall autonomic health.
3.5 Non-Thermal Biological Effects at the Cellular and Molecular Level
Beyond general systemic effects, the consistent, low-intensity electromagnetic field emitted by the jewelry could interact with biological systems at a fundamental cellular and molecular level, even without generating heat. This is a critical distinction, as the effects are proposed to be based on resonance rather than thermal energy.
Mechanistic Insights:
Protein Conformation and Function: Recent research indicates that subtle magnetic fields can influence the conformation and activity of proteins. For instance, studies have explored the "magnetic activation of split proteins," where a magnetic field can induce conformational changes in a protein, leading to its reconstitution and subsequent manipulation of cellular function. This demonstrates a direct molecular interaction with passive electromagnetic fields.
DNA Stability and Synthesis: The biofield framework suggests that biologically generated frequency information (e.g., from an ECG) can enhance processes like DNA synthesis, implying a direct influence of endogenous electromagnetic fields on genetic material. Similarly, external passive fields might exert a subtle influence on cellular processes, including gene expression.
Cellular Homeostasis and Energetics: Low-frequency electromagnetic fields, particularly pulsed fields, have been shown to facilitate biophysical interactions within cells, potentially recharging transmembrane potential, increasing ATP production, enhancing the sodium-potassium pump activity, and elevating cellular pH. These effects suggest a role in maintaining cellular homeostasis and energy balance.

4. Supporting Scientific Evidence
4.1 Clinical Trials on Resonant Frequency Devices (Analogous Technologies)
A clinical trial involving a device with similar frequency embedding technology (the Harmoni Pendant, n=101) demonstrated:
A ~700% increase in HRV Index
A +310% enhancement of vegetative/autonomic regulation
A –48% reduction in stress index
These results reflect a dramatic shift toward parasympathetic dominance, with enhanced physiological resilience during environmental stress. These findings from analogous technologies support the potential physiological impact of continuous resonant frequency exposure, suggesting how McCutcheon's jewelry might achieve similar outcomes by interacting with the ANS as indicated by HRV changes. Further supporting this, Pulsed Electromagnetic Field (PEMF) therapy, a non-invasive method utilizing passive magnetic fields, has consistently demonstrated positive physiological effects, including stress mitigation and autonomic balance restoration.
4.2 Resonance Frequency Breathing Studies
Resonance breathing techniques, which produce steady oscillations near 0.1 Hz, have been shown to improve autonomic function and emotional regulation, paralleling the mechanisms hypothesized for frequency-embedded jewelry. Time-domain indices (RMSSD, NN50, pNN50) reliably track vagal tone—elevated levels correspond with relaxation and resilience. Frequency-domain HF power (0.15–0.4 Hz) mirrors parasympathetic modulation through respiratory-linked heart rhythms. SDNN captures overall variability and autonomic adaptability—increases in SDNN signify balanced ANS dynamics. This research provides a framework for understanding how a constant external resonance, like that potentially emitted by the jewelry, could influence physiological rhythms and contribute to ANS balance.
4.3 Schumann Resonance and Human Brain Waves
The Earth's Schumann Resonance (~7.83 Hz) overlaps with human brain alpha waves (8–13 Hz) and theta waves (4–7 Hz), suggesting that environmental electromagnetic frequencies can modulate neurological function. The Schumann Resonance is described as a constant, globally available synchronization system that continuously stabilizes brain wave activity, effectively acting as a pacemaker for brain rhythms. EEG data indicate that human brain rhythms show transient coherence with Schumann harmonics (7–8, 13–14, 19–20 Hz) in periods of 200–300 ms. Long-term monitoring revealed that HRV cycles in humans sometimes correlate with spectral power of Schumann resonance over ~2.5 day periods. Grounding or "earthing" practices exposing individuals to these natural frequencies improve HRV and reduce stress, analogous to the effects that could be observed from resonant frequency wearables. Proposed mechanisms for this interaction include forced resonance and the influence on ferrimagnetic nanocrystals within the brain and ion cyclotron resonance, where specific frequencies can influence ion movement within biological systems. The blood itself has been considered a magnetically saturated medium, further suggesting interaction potential.
Key Real-World Findings Related to Entrainment:
Schumann Resonance (7.83 Hz Alignment with Alpha/Theta EEG): Experimental trials with a 7.83 Hz ELF generator showed insomnia patients had statistically improved sleep onset and overall sleep architecture in double-blind studies. This demonstrates how a specific external frequency can exert a measurable biological effect by resonating brain waves for sleep.
Distant Biofield Healing: Studies on distant (virtual) biofield energy healing therapy have reported significant improvements in psychological and mental health symptoms. While the precise energetic mechanisms are still being explored, these involve non-contact, passive interactions, suggesting that subtle fields can transmit information and elicit physiological responses at a distance.
4.4 Effects of EMF Exposure and Buffering
Chronic exposure to man-made EMFs, which has reached unprecedented levels, has been linked to autonomic imbalance and reduced HRV. RF EMF and ELF magnetic fields (ELF-MF) are classified as possibly carcinogenic and can affect the structure and modulate the function of the Autonomic Nervous System (ANS), disrupting electrochemical balance via an "ion forced-oscillation mechanism". If McCutcheon's jewelry provides a stable frequency environment or oscillatory field, it may counter these disruptive effects by offering a consistent reference frequency that helps the body maintain equilibrium amidst chaotic environmental EMFs.
Key Real-World Findings on EMF & Buffering:
EMF Exposure Disrupts HRV (2.4 GHz Wi-Fi): HF-HRV, a key parasympathetic marker, decreased significantly (p=0.036), and sympathetic indicator (0V%) increased (p=0.002). These shifts indicate that everyday EMF exposure skews ANS balance toward stress-centric sympathetic activity, highlighting a problem McCutcheon's jewelry aims to address. Contemporary reviews link chronic EMF exposure with autonomic imbalance, oxidative stress, and disruptions to cellular signaling pathways including voltage-gated ion channels and reactive oxygen species regulation.
Protective Resonant Fields 'Buffer' EMF Effects:
Salivary cortisol and HRV disruptions induced by mobile-phone EMF were reversed by protective devices in controlled experiments, suggesting that certain resonant fields can provide a buffering effect.
A flexible Pulsed Electromagnetic Field (PEMF) device used during tilt-table testing significantly increased ANS stability markers (LF, HF, LF/HF ratio), compared to no-field conditions. These results align with controlled therapies where low-frequency electromagnetic fields mitigate stress responses and restore autonomic balance, suggesting McCutcheon's jewelry could operate through similar principles.
PEMF Therapy Boosts Parasympathetic Tone: A pulsed electromagnetic field (PEMF) pilot study in chronic pain patients reported significant increases in: SDNN, RMSSD, NN50, pNN50, and HF power—all resting markers of parasympathetic activation. The sham group showed no changes, suggesting a direct physiological effect. This provides evidence that engineered electromagnetic fields can positively influence autonomic balance, offering a robust rationale for how McCutcheon's jewelry might achieve its reported benefits.
4.5 Subtle Field Influence on Balance and Proprioception
While direct mechanical vibration (e.g., Whole-Body Vibration, WBV) demonstrates clear benefits for balance and strength in older adults, the jewelry's mechanism relies on subtle electromagnetic resonance, not overt mechanical force. However, the outcomes observed in studies on vibratory input can provide an analogy. Even subtle electromagnetic cues could potentially influence proprioception and vestibular integration, contributing to improved balance and postural control. The skin's ability to detect and respond to natural EMFs via "resonance matching" supports the idea that subtle, continuous electromagnetic cues could subtly influence postural awareness and sensorimotor integration, operating akin to a continuous, passive biofeedback.
4.6 Water Structure and Informational Transfer
The concept of McCutcheon's jewelry transferring its resonant frequency to water is supported by research indicating that passive magnetic fields and extremely low-frequency (ELF) electromagnetic fields can influence water's molecular structure. Studies have shown that magnetic fields can alter water's hydrogen bonding, increase the average size of water clusters, and influence the rotational motions of water molecules. Furthermore, induced currents from ELF EMFs can temporarily change the molecular structure by affecting hydrogen bonds. This suggests that water, when exposed to specific resonant frequencies, might undergo subtle structural changes, potentially enabling it to retain and transmit this low-frequency information. When such structured water is consumed, it could theoretically influence biological systems through resonant interactions with the body's own fluids and cellular environment.

5. Integrated Mechanism Model
Frequency Embedding: Stable resonant frequencies are presumed to be semi-permanently embedded into mineral-containing materials using McCutcheon's proprietary technology.
Continuous Resonance: The material may emit a passive oscillatory field, acting as a consistent frequency source, potentially interacting with the body's biofield.
Neurophysiological Entrainment: The wearer's nervous system could entrain to the stable frequency, potentially enhancing autonomic regulation and brainwave stability, similar to how natural resonant fields influence human physiology.
Physiological Stabilization: Enhanced HRV and autonomic balance may reduce stress and improve emotional state as a result of this entrainment, as supported by research on analogous frequency devices.
Sensorimotor Influence: Subtle resonant input, mediated by electromagnetic cues, could support balance and coordination by influencing proprioception and vestibular function.
EMF Noise Buffering: The stable oscillation may mitigate disruptive ambient electromagnetic interference, contributing to physiological stability by providing a consistent reference signal for cellular and electrical systems.
Frequency Transfer: The resonant frequency can transfer to other mineral-containing materials and water. This is plausible through the influence of electromagnetic fields on water's molecular structure, potentially allowing indirect exposure and internalization of the frequency upon consumption.

6. Conclusion and Future Directions
McCutcheon's Health Products resonant frequency jewelry offers an innovative approach to wearable bioactive technology based on the premise of embedded stable frequencies. By exploring how these frequencies could interact with biological systems, this report has connected the potential mechanisms of McCutcheon's jewelry to existing peer-reviewed scientific understanding of resonant frequencies, biofields, and their effects on autonomic function, emotional well-being, and physical balance. While in-house findings are promising, further controlled, independent research, including clinical trials measuring balance metrics, HRV, EEG, and biochemical markers after exposure to frequency-infused materials, is encouraged to deepen understanding and fully validate efficacy. This continued research will be crucial in definitively establishing the direct impacts of McCutcheon's specific technology and its role in improving human health.

7. References
Polyakov, V., et al. (2023). "Effects of Non-Electronic Frequency Devices on Autonomic Function," Journal of Bioelectromagnetics.
Lehrer, P., et al. (2020). "Resonance Frequency Breathing and HRV," Applied Psychophysiology and Biofeedback.
Cherry, N. (2002). "Schumann Resonance Frequencies and Human Brain Waves," Electromagnetic Biology and Medicine.
Ahmed, Y. B., et al. (2024). "A putative design for the electromagnetic activation of split proteins for molecular and cellular manipulation." Frontiers in Molecular Biosciences, 11.
Burr, H. S. (1972). Blueprint for Immortality: The Electric Patterns of Life. Spearman. (Discussed in Harvard DASH review)
Carrascosa, S. (2022). "Electromagnetic fields as a non-invasive alternative therapy for the treatment of musculoskeletal diseases." Ciencia e Investigación Médica Estudiantil, 29(3).
Chung, S. T., et al. (2024). "Effects of distant biofield energy healing on adults associated with psychological and mental health-related symptoms: a randomized, placebo-controlled, double-blind study." Complementary Therapies in Clinical Practice, 56, 101783.
Grigoryev, Y. G., & Shainskaya, A. M. (2018). "Schumann Resonances and the Human Body: Questions About Interactions, Problems and Prospects." MDPI Acoustics, 1(1), 16-32.
Hao, Y., et al. (2018). "The effects of magnetic fields on water molecular hydrogen bonds." ResearchGate.
Irigaray, S., et al. (2023). "Biological effects of magnetic fields emitted by graphene devices, on induced oxidative stress in human cultured cells." Frontiers in Oncology, 13, 1147573.
Lehto, M. (2023). "A comprehensive mechanism of biological and health effects of anthropogenic extremely low frequency and wireless communication electromagnetic fields." Frontiers in Public Health, 11, 1222473.
Lehto, M., & Mäkinen, A. (2023). "Unveiling the biological effects of radio-frequency and extremely-low frequency electromagnetic fields on the central nervous system performance." Journal of Biological Physics, 49(2), 227-248.
Polyakov, V., et al. (2023). "Effects of Non-Electronic Frequency Devices on Autonomic Function," Journal of Bioelectromagnetics. (Harmoni Pendant Clinical Study)
ResearchGate. "The Influence of Electromagnetic Field Pollution on Human Health: A Systematic Review." (Accessed via researchgate.net/publication/348398457)
Rubik, B. (2002). "The biofield hypothesis: Its relevance to energy healing." Journal of Alternative & Complementary Medicine, 8(6), 703-717.
Saboo, A., & Saboo, P. (2023). "Pulsed Electromagnetic Fields (PEMFs) Trigger Cell Death and Senescence in Cancer Cells." Current Oncology, 30(2), 2132-2144.
Schwartz, S. A., & Rubik, B. (2019). "An Integrative Review of Scientific Evidence for Reconnective Healing." Harvard DASH.
Teleologico.com. "The Memory of Water: Molecular Interactions and Frequency Resonance." https://www.teleologico.com/post/the-memory-of-watermolecular-interactions-and-frequency-resonance
Xu, D., et al. (2023). "Low resonant frequency storage and transfer in structured water cluster." ResearchGate.
`;

function FullReportContent() {
  // Split into sections by numbered headers (1., 2., 3., ...)
  const lines = fullReportRaw.split('\n');
  const elements = [];
  let buffer = [];
  let sectionTitle = null;
  let subsectionTitle = null;
  let inReferences = false;

  function pushSection(title, content, isSubsection = false) {
    if (!content.length) return;
    if (isSubsection) {
      elements.push(
        <h4 className="text-lg font-semibold mt-8 mb-2 text-blue-700 dark:text-blue-300" key={title + Math.random()}>{title}</h4>
      );
      elements.push(
        <p className="mb-4 text-gray-800 dark:text-gray-200" key={title + '-content-' + Math.random()}>{content.join(' ')}</p>
      );
    } else {
      elements.push(
        <h3 className="text-xl font-bold mt-10 mb-4 text-purple-800 dark:text-purple-200" key={title + Math.random()}>{title}</h3>
      );
      elements.push(
        <p className="mb-4 text-gray-800 dark:text-gray-200" key={title + '-content-' + Math.random()}>{content.join(' ')}</p>
      );
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // Main section header (e.g., 1. Introduction)
    const mainHeader = line.match(/^(\d+)\.\s+(.+)/);
    // Subsection header (e.g., 3.1 ...)
    const subHeader = line.match(/^(\d+\.\d+)\s+(.+)/);
    // References header
    if (line.match(/^7\. References/)) {
      pushSection(sectionTitle, buffer);
      sectionTitle = 'References';
      buffer = [];
      inReferences = true;
      elements.push(
        <h3 className="text-xl font-bold mt-10 mb-4 text-purple-800 dark:text-purple-200" key={'References'}>References</h3>
      );
      continue;
    }
    if (inReferences) {
      if (line) {
        elements.push(
          <p className="mb-2 text-gray-700 dark:text-gray-300 text-sm" key={'ref-' + i}>{line}</p>
        );
      }
      continue;
    }
    if (mainHeader && !subHeader) {
      // New main section
      pushSection(sectionTitle, buffer);
      sectionTitle = mainHeader[2];
      buffer = [];
      continue;
    }
    if (subHeader) {
      // New subsection
      pushSection(sectionTitle, buffer);
      sectionTitle = subHeader[2];
      buffer = [];
      continue;
    }
    if (line === 'Detailed Report: McCutcheon\'s Health Products: Exploring the Mechanisms of Resonant Frequency Jewelry') {
      elements.push(
        <h2 className="text-2xl font-bold mt-2 mb-6 text-center text-gray-900 dark:text-gray-100" key="main-title">{line}</h2>
      );
      continue;
    }
    if (line) buffer.push(line);
  }
  // Push any remaining content
  pushSection(sectionTitle, buffer);
  return <div>{elements}</div>;
}

export default ResFreqAnalyzer; 