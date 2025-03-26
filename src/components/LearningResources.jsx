import React from 'react';
import { Card, List, Tag, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const LearningResources = ({ darkMode }) => {
  const learningPaths = {
    'Core CS': [
      { name: 'Data Structures & Algorithms', url: 'https://www.geeksforgeeks.org/dsa-self-paced' },
      { name: 'Operating Systems', url: 'https://www.coursera.org/learn/os-power-user' },
      { name: 'Database Management', url: 'https://www.mongodb.com/university' },
      { name: 'Computer Networks', url: 'https://www.coursera.org/specializations/computer-networks' },
    ],
    'Web Development': [
      { name: 'React.js', url: 'https://react.dev/' },
      { name: 'Node.js', url: 'https://nodejs.org/learn' },
      { name: 'Next.js', url: 'https://nextjs.org/learn' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/docs/' },
    ],
    'Practice Platforms': [
      { name: 'LeetCode', url: 'https://leetcode.com' },
      { name: 'HackerRank', url: 'https://www.hackerrank.com' },
      { name: 'CodeChef', url: 'https://www.codechef.com' },
      { name: 'GeeksforGeeks', url: 'https://practice.geeksforgeeks.org' },
    ],
    'Interview Prep': [
      { name: 'System Design', url: 'https://github.com/donnemartin/system-design-primer' },
      { name: 'Tech Interview Handbook', url: 'https://www.techinterviewhandbook.org' },
      { name: 'Pramp', url: 'https://www.pramp.com' },
      { name: 'InterviewBit', url: 'https://www.interviewbit.com' },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(learningPaths).map(([category, resources]) => (
        <Card
          key={category}
          title={category}
          className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          extra={<Tag color="blue">{resources.length} Resources</Tag>}
        >
          <List
            itemLayout="horizontal"
            dataSource={resources}
            renderItem={(item) => (
              <List.Item
                extra={
                  <Button
                    type="text"
                    icon={<RightOutlined />}
                    onClick={() => window.open(item.url, '_blank')}
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={darkMode ? 'text-white' : 'text-gray-800'}
                    >
                      {item.name}
                    </a>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      ))}
    </div>
  );
};

export default LearningResources;
