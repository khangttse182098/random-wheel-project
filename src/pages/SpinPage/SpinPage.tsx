import { Button, Card, Modal, Select, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import RollingSlot from "../../components/RollingSlot/RollingSlot";
import {
  getRollingNumber,
  saveWinner,
  getWinnerList,
} from "../../service/event/api";
import useAppStore from "../../store/useAppStore";
import style from "./SpinPage.module.scss";
import "./select.scss";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { RewardData } from "../../models/reward";

const SpinPage = () => {
  const { Title, Text } = Typography;
  const {
    participantList,
    setParticipantList,
    eventSetting,
    rewardList,
    setWinnerList,
    setRewardList,
    winnerList,
  } = useAppStore((state) => state);

  const [remainingParticipants, setRemainingParticipants] = useState(
    structuredClone(participantList)
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [winners, setWinners] = useState<any>([]);
  const [winnerPerRoll, setWinnerPerRoll] = useState<number>(0);
  const [selectedReward, setSelectedReward] = useState<number>(0);
  const [rollingTurns, setRollingTurnsLeft] = useState<number>(0);
  const [winnerId, setWinnerId] = useState<number[]>([]);

  const codeList = participantList!.map((item) => item.code);
  const [code, setCode] = useState<string[]>(
    Array(codeList[0].length).fill("")
  );
  const [previousCode, setPreviousCode] = useState<string[]>(
    Array(codeList[0].length).fill("0")
  );
  const [spinKey, setSpinKey] = useState(0);

  // ----------------------------------- Tạo ra người trúng thưởng ----------------------------
  const handldeGetRandomCode = () => {
    if (remainingParticipants?.length === 0) return [];
    const randomPosition = Math.floor(
      Math.random() * remainingParticipants!.length
    );
    const selectedCode = remainingParticipants?.[randomPosition].code;

    // remove selected participant from participantsList
    remainingParticipants?.splice(randomPosition, 1);
    console.log("Remaining participants: ", remainingParticipants);
    console.log("Participant list: ", participantList);

    return selectedCode?.split("");
  };
  // ------------------------------------------------------------------------------------------

  // ------------------------------------ Hiện Modal ------------------------------------------
  const handleSpinAndShowWinners = () => {
    spin();
    setTimeout(() => {
      setShowModal(true);
    }, 5000);
  };
  // ------------------------------------------------------------------------------------------

  // --------------------------- Hàm chuyển giải quay ---------------------------
  const handleChangeReward = useCallback(() => {
    const rewardedParticipants =
      participantList?.filter((p) => !p.isRewarded) ?? null;
    setRemainingParticipants(rewardedParticipants);
  }, []);

  // --------------------------- Hàm huỷ lưu kết quả người trúng thưởng ---------------------------
  const handleCancelWinner = useCallback(() => {
    setRemainingParticipants(structuredClone(participantList));
  }, []);

  // --------------------------- Hàm lưu kết quả người trúng thưởng ---------------------------
  const handleSaveWinner = useCallback(
    async (updatedWinnerId: number[]) => {
      if (!updatedWinnerId.length) return alert("Chưa có người trúng thưởng!");

      try {
        const payload = {
          rewardId: selectedReward,
          winnersId: winnerId,
          rollingOrder: rollingTurns + 1,
        };
        console.log("Payload gửi lên:", payload);
        await saveWinner(payload);

        // Fetch the updated winner list
        const res = await getWinnerList(eventSetting!.eventId.toString());
        const updatedWinnerList = res.data.data;
        setWinnerList(updatedWinnerList);

        // Update isRewarded state in participantList
        const updatedParticipantList = participantList?.map((participant) => {
          const currentId = parseInt(participant.id!);
          if (winnerId.includes(currentId)) {
            return {
              ...participant,
              isRewarded: true,
              rewardId: participant.rewardId
                ? [...participant.rewardId, selectedReward]
                : [selectedReward],
            };
          }
          return participant;
        });
        setParticipantList(updatedParticipantList!);

        // Loại người đã trúng khỏi danh sách quay
        setRemainingParticipants((prev: any) =>
          prev.filter((p: any) => !winnerId.includes(parseFloat(p.id)))
        );
        setShowModal(false);
        toast.success("Đã lưu danh sách người trúng thưởng!");

        setRewardList(
          rewardList?.map((reward) => {
            if (reward.id === selectedReward) {
              return { ...reward, status: "Đã quay" };
            }
            return reward;
          }) as RewardData[]
        );
      } catch (error) {
        console.log("Lỗi khi lưu kết quả:", error);
      }
    },
    [
      selectedReward,
      winnerId,
      rollingTurns,
      eventSetting?.eventId,
      setWinnerList,
      setParticipantList,
      setRewardList,
    ]
  );

  // ---------------------------------- Hàm lấy số lượt quay ----------------------------------
  const handleFetchSlotRoll = useCallback(async (rewardId: number) => {
    try {
      const res = await getRollingNumber(rewardId);
      const data = res.data.data;
      setRollingTurnsLeft(data.rollingNumber);
      setWinnerPerRoll(data.winnerNumber);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (selectedReward !== 0) {
      handleFetchSlotRoll(selectedReward);
    }
  }, [selectedReward, handleFetchSlotRoll]);

  // ------------------------------------ Hàm để quay ------------------------------------------
  const spin = () => {
    const selectedWinners: string[] = [];
    for (let i = 0; i < winnerPerRoll; i++) {
      const randomCode = handldeGetRandomCode();
      if (randomCode) {
        selectedWinners.push(randomCode.join(""));
      }
    }
    console.log("winnerPerRoll", winnerPerRoll);
    console.log("selectedWinner", selectedWinners);
    console.log("participantList", participantList);

    const winnersList = selectedWinners.map((code) =>
      participantList?.find((item) => item.code === code)
    );
    console.log("winnersList", winnersList);

    setWinners(winnersList);

    const winner = selectedWinners
      .map((code) => participantList?.find((item) => item.code === code)?.id)
      .filter((id): id is string => id !== undefined)
      .map((id) => parseInt(id, 10));

    console.log("winner", winner);
    setWinnerId(winner);

    setPreviousCode(spinKey ? code : previousCode);
    setCode(
      selectedWinners[0]?.split("") || Array(codeList[0].length).fill("")
    );
    setSpinKey((prevKey) => prevKey + 1);
    setRollingTurnsLeft((prev) => prev - 1);
  };
  // ------------------------------------------------------------------------------------------

  return (
    <>
      <div className={style["container"]}>
        <div className={style["img-container"]}>
          {eventSetting?.showLogo ? (
            <img src={eventSetting?.logo} alt="logo" />
          ) : null}
        </div>
        <h2
          style={
            { "--titleText": eventSetting?.textColor } as React.CSSProperties
          }
          className={style["title"]}
        >
          {eventSetting?.showEventName ? eventSetting.eventName : <> </>}
        </h2>
        <div
          className={style["slot-machine"]}
          style={
            { "--borderColor": eventSetting?.textColor } as React.CSSProperties
          }
        >
          {code.map((num, index) => (
            <RollingSlot
              key={`${spinKey}-${index}`}
              currentCode={num}
              delay={index * 0.3}
              previousCode={previousCode[index]}
            />
          ))}
        </div>
        <div className={style["button-container"]}>
          <Select
            defaultValue="Chọn giải quay"
            suffixIcon={
              <TiArrowSortedDown size={20} color={eventSetting?.textColor} />
            }
            className={style["select-reward"]}
            style={
              {
                "--selectBg": eventSetting?.buttonColor,
                "--selectText": eventSetting?.textColor,
              } as React.CSSProperties
            }
            options={rewardList?.map((item) => ({
              value: item.rewardName,
              label: item.rewardName,
            }))}
            onChange={(value) => {
              const selectedRewardData = rewardList?.find(
                (item) => item.rewardName === value
              );
              if (selectedRewardData) {
                setSelectedReward(selectedRewardData.id);
                setRollingTurnsLeft(selectedRewardData.rollingNumber);
                handleFetchSlotRoll(selectedRewardData.id);
                handleChangeReward();
              }
            }}
          />
          <div
            className={style["remaining-slot"]}
            style={
              {
                "--buttonBg": eventSetting?.buttonColor,
                "--buttonText": eventSetting?.textColor,
              } as React.CSSProperties
            }
          >
            <span>
              {selectedReward === 0
                ? "Chưa chọn giải quay"
                : rollingTurns > 0
                ? `Lượt quay còn lại: ${rollingTurns}`
                : winnerList?.some(
                    (winner) =>
                      winner.rollingOrder ===
                      rewardList!.find((item) => item.id === selectedReward)
                        ?.rollingNumber
                  )
                ? "Giải này đã có kết quả 🎉"
                : "Lượt quay còn lại: 0"}
            </span>
          </div>
          <button
            onClick={handleSpinAndShowWinners}
            style={
              {
                "--buttonBg": eventSetting?.buttonColor,
                "--buttonText": eventSetting?.textColor,
              } as React.CSSProperties
            }
            className={style["button"]}
          >
            Quay
          </button>
        </div>
      </div>
      <Modal
        onCancel={() => {
          setShowModal(false);
          setRollingTurnsLeft(rollingTurns + 1);
        }}
        open={showModal}
        footer={[
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px" }}
          >
            <Button
              key="back"
              onClick={() => {
                setShowModal(false);
                setRollingTurnsLeft(rollingTurns + 1);
                handleCancelWinner();
              }}
            >
              Hủy
            </Button>
            <Button type="primary" onClick={() => handleSaveWinner(winnerId)}>
              Lưu kết quả
            </Button>
          </div>,
        ]}
      >
        <div style={{ textAlign: "center" }}>
          <Title level={2} style={{ color: "#2774c7" }}>
            Kết quả quay số may mắn 🎉
          </Title>
          {winners.length > 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {winners.map((winner: any, index: any) =>
                winner ? (
                  <motion.div
                    key={winner.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    {winnerPerRoll <= 5 ? (
                      <Card
                        style={{
                          borderRadius: "12px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          textAlign: "center",
                        }}
                      >
                        <Text strong style={{ fontSize: "16px" }}>
                          Mã số:
                        </Text>{" "}
                        <Text style={{ fontSize: "16px" }}>{winner.code}</Text>{" "}
                        <br />
                        <Text strong style={{ fontSize: "16px" }}>
                          Tên:
                        </Text>{" "}
                        <Text style={{ fontSize: "16px" }}>
                          {winner.fullName}
                        </Text>{" "}
                        <br />
                        <Text strong style={{ fontSize: "16px" }}>
                          Phòng ban:
                        </Text>{" "}
                        <Text style={{ fontSize: "16px" }}>
                          {winner.department}
                        </Text>
                      </Card>
                    ) : (
                      <Card
                        style={{
                          borderRadius: "12px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            gap: "12px",
                          }}
                        >
                          <Text style={{ fontSize: "16px" }}>
                            Mã số:{" "}
                            <Text
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {winner.code}
                            </Text>
                          </Text>
                          <Text style={{ fontSize: "16px" }}>
                            Tên:{" "}
                            <Text
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {winner.fullName}
                            </Text>
                          </Text>
                          <Text style={{ fontSize: "16px" }}>
                            Phòng ban:{" "}
                            <Text
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {winner.department}
                            </Text>
                          </Text>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ) : null
              )}
            </div>
          ) : (
            <Text
              type="secondary"
              style={{ fontSize: "16px", display: "block", marginTop: "12px" }}
            >
              Không có người trúng thưởng 😞
            </Text>
          )}
        </div>
      </Modal>
    </>
  );
};

export default SpinPage;
