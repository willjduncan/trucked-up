const dotenv = require("dotenv").config();
const db = require("./connection");
const { User, Client, Project } = require("../models");

db.once("open", async () => {
  await Client.deleteMany();
  await User.deleteMany();
  await Project.deleteMany();

  const clients = await Client.insertMany([
    { name: "Dump-Bros" },
    { name: "Construction-Buds" },
  ]);

  console.log("CLIENTS SEEDED");

  const Bill = await User.create({
    username: "Billy-The-Kid",
    email: "bill@gmail.com",
    password: "123456",
    confirmPassword: "123456",
    position: "driver",
  });

  const Phill = await User.create({
    username: "Philly-The-Kid",
    email: "phill@gmail.com",
    password: "123456",
    confirmPassword: "123456",
    position: "driver",
  });

  const Megan = await User.create({
    username: "Megan",
    email: "meg@gmail.com",
    password: "123456",
    confirmPassword: "123456",
    position: "dispatcher",
  });

  console.log("USERS SEEDED");

  const projects = await Project.insertMany([
    {
      client: clients[0]._id,
      jobName: "Removal-001",
      description: "Site located East of building. Load debris and haul off.",
      pickUpAddress: "123 street",
      deliveryAddress: "456 Ave.",
      startTime: "1663236000000",
    },
    {
        client: clients[0]._id,
        jobName: "Removal-002",
        description: "Second removal at a letter date",
        pickUpAddress: "123 street",
        deliveryAddress: "456 Ave.",
        startTime: "1664971200000",
      },
      {
        client: clients[1]._id,
        jobName: "Git-The Goods",
        description: "Go there and git the goods!",
        pickUpAddress: "123 street",
        deliveryAddress: "456 Ave.",
        startTime: "1659700800000",
      },
  ]);

  await Bill.update({$addToSet: {projects: {_id: projects[0]._id}}})
  await Bill.update({$addToSet: {projects: {_id: projects[2]._id}}})
  await Phill.update({$addToSet: {projects: {_id: projects[1]._id}}})
  await Phill.update({$addToSet: {projects: {_id: projects[2]._id}}})
  await projects[0].update({ $addToSet: { driver: { _id: Bill._id } } });
  await projects[1].update({ $addToSet: { driver: { _id: Phill._id } } });
  await projects[2].update({ $addToSet: { driver: { _id: Phill._id } } });
  await projects[2].update({ $addToSet: { driver: { _id: Bill._id } } });
  await clients[0].update({
    $addToSet: { projects: { _id: projects[0]._id } },
  });
  await clients[0].update({
    $addToSet: { projects: { _id: projects[1]._id } },
  });
  await clients[1].update({
    $addToSet: { projects: { _id: projects[2]._id } },
  });
  console.log("*** Ignore above warning ***")

  console.log("PROJECTS SEEDED");

  console.log("Good Luck!");

  process.exit();
});
