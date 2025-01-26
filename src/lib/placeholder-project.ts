export type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  githubUrl: string
  deployedUrl: string
  imageUrl: string
  content: string
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "AI-Powered Task Manager",
    description: "A task management application that uses AI to prioritize and categorize tasks.",
    tags: ["React", "Node.js", "OpenAI", "MongoDB"],
    githubUrl: "https://github.com/username/ai-task-manager",
    deployedUrl: "https://ai-task-manager.vercel.app",
    imageUrl: "/placeholder.svg",
    content: `
# AI-Powered Task Manager

## Project Overview

The AI-Powered Task Manager is a web application that leverages artificial intelligence to help users manage their tasks more efficiently. By analyzing task descriptions, due dates, and user behavior, the AI suggests task priorities, estimates completion times, and even recommends the best time of day for tackling specific tasks.

## Key Features

- AI-driven task prioritization
- Natural language processing for task input
- Personalized task scheduling recommendations
- Integration with popular calendar apps
- Real-time collaboration features

## Technical Stack

- Frontend: React with Next.js
- Backend: Node.js with Express
- Database: MongoDB
- AI Integration: OpenAI's GPT-3
- Authentication: Auth0
- Deployment: Vercel

## Challenges and Solutions

One of the main challenges was integrating the AI component in a way that felt natural and helpful rather than intrusive. We solved this by...

## Learnings

1. **Working with AI APIs**: I gained valuable experience in integrating and fine-tuning AI models for practical applications.
2. **Optimizing React Performance**: Learned advanced techniques for memoization and efficient re-rendering in React.
3. **Database Design for Flexibility**: Designed a MongoDB schema that could easily adapt to evolving AI-generated data structures.

## Future Improvements

- Implement a mobile app version
- Add more granular AI-driven insights
- Integrate with project management tools like Jira and Trello

This project was a fantastic opportunity to explore the intersection of AI and productivity tools, and I'm excited to continue evolving it based on user feedback and emerging AI capabilities.
    `,
  },
  {
    id: "project-2",
    title: "Blockchain-Based Voting System",
    description: "A secure and transparent voting system built on blockchain technology.",
    tags: ["Solidity", "Ethereum", "React", "Web3.js"],
    githubUrl: "https://github.com/username/blockchain-voting",
    deployedUrl: "https://blockchain-voting.vercel.app",
    imageUrl: "/placeholder.svg",
    content: `
# Blockchain-Based Voting System

## Project Overview

This project implements a secure and transparent voting system using blockchain technology. It aims to address common issues in traditional voting systems such as fraud, lack of transparency, and accessibility.

## Key Features

- Decentralized voting records
- Anonymous yet verifiable voting
- Real-time result tabulation
- Voter registration and verification
- Accessible from any device with internet connection

## Technical Stack

- Smart Contracts: Solidity
- Blockchain: Ethereum
- Frontend: React
- Blockchain Interaction: Web3.js
- Backend: Node.js
- Deployment: Vercel (frontend) and Ethereum Mainnet (smart contracts)

## Challenges and Solutions

One of the biggest challenges was ensuring voter anonymity while also maintaining the ability to verify that each vote was cast by a registered voter. We solved this by...

## Learnings

1. **Smart Contract Development**: Gained deep understanding of writing secure and efficient smart contracts.
2. **Blockchain Scalability**: Learned about the challenges and solutions for scaling blockchain applications.
3. **Cryptographic Techniques**: Implemented zero-knowledge proofs for voter verification.

## Future Improvements

- Implement a layer 2 solution for reduced transaction costs
- Add support for multiple election types (ranked choice, multi-select, etc.)
- Develop a mobile app for easier access

This project opened my eyes to the potential of blockchain technology beyond cryptocurrencies and sparked my interest in exploring more decentralized applications.
    `,
  },
]

