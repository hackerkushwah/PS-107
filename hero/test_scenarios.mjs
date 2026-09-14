async function testScenarios() {
  const scenarios = [
    {
      name: "Scenario 1: Broad requirement question",
      query: "Is BIS certification required?",
      messages: [{ role: "user", content: "Is BIS certification required?" }]
    },
    {
      name: "Scenario 2: Complete question - Household electric kettles",
      query: "I manufacture household electric kettles. What BIS requirements apply?",
      messages: [{ role: "user", content: "I manufacture household electric kettles. What BIS requirements apply?" }]
    },
    {
      name: "Scenario 3: Broad intent - I want BIS certification",
      query: "I want BIS certification.",
      messages: [{ role: "user", content: "I want BIS certification." }]
    },
    {
      name: "Scenario 4: Machine category - I manufacture a machine",
      query: "I manufacture a machine.",
      messages: [{ role: "user", content: "I manufacture a machine." }]
    },
    {
      name: "Scenario 5: Hinglish HUID check",
      query: "mera gold ka HUID check karna hai",
      messages: [{ role: "user", content: "mera gold ka HUID check karna hai" }]
    },
    {
      name: "Scenario 6: Direct standard enquiry - IS 13252",
      query: "what is IS 13252?",
      messages: [{ role: "user", content: "what is IS 13252?" }]
    },
    {
      name: "Scenario 7: Electronics general inquiry",
      query: "I manufacture electronics in India.",
      messages: [{ role: "user", content: "I manufacture electronics in India." }]
    },
    {
      name: "Scenario 8: Complete wireless keyboards query",
      query: "I manufacture wireless keyboards. What BIS registration do I need?",
      messages: [{ role: "user", content: "I manufacture wireless keyboards. What BIS registration do I need?" }]
    },
    {
      name: "Scenario 9: Topic switch from appliances to HUID check",
      query: "Actually, how do I verify a HUID?",
      messages: [
        { role: "user", content: "I manufacture electrical appliances." },
        { role: "assistant", content: "What specific electrical appliance do you manufacture?" },
        { role: "user", content: "Actually, how do I verify a HUID?" }
      ]
    },
    {
      name: "Scenario 10: Vague one-word message",
      query: "bis",
      messages: [{ role: "user", content: "bis" }]
    },
    {
      name: "Scenario 20: Conversational memory follow-up (Testing)",
      query: "what about testing?",
      messages: [
        { role: "user", content: "I manufacture household electric kettles." },
        { role: "assistant", content: "Domestic electric kettles require mandatory ISI mark under IS 302-2-15." },
        { role: "user", content: "what about testing?" }
      ]
    },
    {
      name: "Scenario 20B: Conversational memory follow-up (Fees)",
      query: "and what is the fee?",
      messages: [
        { role: "user", content: "I manufacture household electric kettles." },
        { role: "assistant", content: "Domestic electric kettles require mandatory ISI mark under IS 302-2-15." },
        { role: "user", content: "and what is the fee?" }
      ]
    },
    {
      name: "Scenario Extra: Expired licence question",
      query: "my licence expired what should I do",
      messages: [{ role: "user", content: "my licence expired what should I do" }]
    }
  ];

  console.log("=== RUNNING MANAKSETU AI TEST SUITE ===");

  for (const s of scenarios) {
    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: s.messages,
          language: "en"
        })
      });
      const data = await res.json();
      console.log(`\n-----------------------------------------`);
      console.log(`TEST: ${s.name}`);
      console.log(`QUERY: "${s.query}"`);
      console.log(`RESPONSE TYPE: ${data.structured?.type}`);
      if (data.structured?.type === "clarification") {
        console.log(`QUESTION: ${data.structured.question}`);
        console.log(`CAN SKIP: ${data.structured.canSkip}`);
        console.log(`QUICK REPLIES (${data.structured.quickReplies?.length}):`, data.structured.quickReplies);
      } else {
        console.log(`SHORT ANSWER: ${data.structured?.shortAnswer}`);
        console.log(`STANDARD: ${data.structured?.evidence?.standardCode} (${data.structured?.evidence?.scheme})`);
        console.log(`ACCORDION SECTIONS (${data.structured?.detailsAccordion?.length || 0}):`, data.structured?.detailsAccordion?.map(a => a.title));
        console.log(`NEXT STEPS: ${data.structured?.whatNext?.length} steps`);
      }
    } catch (err) {
      console.error(`Error in ${s.name}:`, err.message);
    }
  }
}

testScenarios();
