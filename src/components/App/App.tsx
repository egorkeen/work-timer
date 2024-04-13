import { useEffect, useState } from "react";
import { Flex, Typography, TimePicker, Button } from "antd";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;

import styles from './App.module.css'
import { formatTime } from "../../utils";

const App = () => {
  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const [targetTime, setTargetTime] = useState<Dayjs>(() => {
    return dayjs().startOf("day").add(8, "hours");
  });
  const [finishTime, setFinishTime] = useState<Dayjs>(dayjs().add(8, "hours"));

  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const handleSetRemainingTime = (time: Dayjs) => {
    setTargetTime(time);
    setFinishTime(startTime.add(time.diff(dayjs().startOf("day"))));
  };

  const handleStartTimer = () => {
    setStartTime(dayjs());
    setTimerRunning(true);
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
  };

  useEffect(() => {
    let intervalId = null;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setTargetTime(prevTime => prevTime.subtract(1, "second"));
      }, 1000);
    } else if (!timerRunning) {
      intervalId = setInterval(() => {
        setFinishTime(prevTime => prevTime.add(1, "second"));
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timerRunning]);

  return (
    <Flex className={styles.app} vertical align="center">
      <Title level={1}>Work Timer</Title>
      <Text>Осталось: {formatTime(targetTime)}</Text>
      <Text>Закончите: {finishTime.format("YYYY-MM-DD HH:mm:ss")}</Text>
      <TimePicker
        value={targetTime}
        disabled={timerRunning}
        onChange={handleSetRemainingTime}
        placeholder="Время"
      />
      <Flex gap={10}>
        <Button block type="primary" onClick={handleStartTimer} disabled={timerRunning}>Start</Button>
        <Button block type="primary" danger onClick={handleStopTimer} disabled={!timerRunning}>Stop</Button>
      </Flex>
    </Flex >
  );
};

export default App;
