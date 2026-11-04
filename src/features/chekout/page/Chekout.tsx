"use client";
import { Button, Form, Input, Select, Space, Spin } from "antd";
import OrderSumma from "../../cart/components/OrderSumma";
import { useGetRegions } from "@/src/hooks/useGetRegions";
import { useGetDistricts } from "@/src/hooks/useGetDistriks";
import { useGetMahallas } from "@/src/hooks/useGetMahallas";
import { useState } from "react";
import { AddressType } from "@/src/types";
import { useAddOrder } from "@/src/hooks/useAddOrder";

export default function Chekout() {
  const [regionId, setRegionId] = useState<string | undefined>();
  const [districtId, setDistrictId] = useState<string | undefined>();
  //order
  const { mutate, isPending } = useAddOrder();
  // regions
  const { regions } = useGetRegions();
  const { districts } = useGetDistricts(regionId);
  const { mahallas: mahallass } = useGetMahallas(regionId, districtId);
  const [form] = Form.useForm();
  console.log(mahallass);

  const onFinish = (values: AddressType) => {
    const { notes, ...address } = values;
    console.log();
    mutate({
      address: {
        ...address,
      },
      notes,
    });
  };
  return (
    <div className="grid grid-cols-[1fr_300px] w-310 py-5 m-auto gap-5 items-start">
      <div className="shadow-lg rounded-2xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="p-4!"
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={"firstName"} name={"firstName"}>
              <Input placeholder="firstName" />
            </Form.Item>

            <Form.Item label={"lastName"} name={"lastName"}>
              <Input placeholder="lastName" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={"phone"} name={"phone"}>
              <Space.Compact style={{ width: "100%" }}>
                <Input value="+998" style={{ width: "75px" }} />
                <Input type="tel" placeholder="931055475" maxLength={9} />
              </Space.Compact>
            </Form.Item>

            <Form.Item label={"region"} name={"region"}>
              <Select
                showSearch
                placeholder="Viloyatni tanlang"
                options={regions?.map((region) => ({
                  label: region?.name,
                  value: region?.id,
                }))}
                onChange={(e) => {
                  setRegionId(e);
                  console.log(e);
                }}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={"Tuman"} name={"district"}>
              <Select
                showSearch
                placeholder="Tumanni tanlang"
                options={districts?.districts?.map((district) => ({
                  label: district?.name,
                  value: district?.id,
                }))}
                onChange={(e) => {
                  setDistrictId(e);
                  console.log(e);
                }}
              />
            </Form.Item>

            <Form.Item label={"mahalla"} name={"mahalla"}>
              <Select
                showSearch
                placeholder="Mahallani tanlang"
                options={mahallass?.mahallas?.map((mahalla) => ({
                  label: mahalla?.name,
                  value: mahalla?.id,
                }))}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={"ko'cha"} name={"street"}>
              <Input placeholder="ko'cha" />
            </Form.Item>

            <Form.Item label={"uy"} name={"house"}>
              <Input placeholder="uy" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label={"xonadon"} name={"apartment"}>
              <Input placeholder="xonadon" />
            </Form.Item>

            <Form.Item label={"comment"} name={"comment"}>
              <Input placeholder="comment" />
            </Form.Item>
          </div>

          <Form.Item label={"notes"} name={"notes"}>
            <Input placeholder="notes" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            {isPending ? <Spin /> : "Buyurtma qilish"}
          </Button>
        </Form>
      </div>
      <OrderSumma showButton={false}/>
    </div>
  );
}
