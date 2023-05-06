import type { User, Organization, UserOrganization } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type UserType = {
  name: string
  userId: string
  studentId: string
  discordId: string
  token: string
  allow: string
}

export async function createUser(data: UserType): Promise<User> {
  return await prisma.user.create({ data })
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({ where: { id } })
}

export async function updateUser(id: number, updatedData: Partial<User>) {
  return await prisma.user.update({ where: { id }, data: updatedData })
}

export async function findUserByDiscordId(discordId: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  })
}

export async function getAllOrganizations(): Promise<Organization[]> {
  return await prisma.organization.findMany()
}

export async function addUserToOrganization(
  userId: string,
  organizationId: string
): Promise<UserOrganization> {
  return await prisma.userOrganization.create({
    data: {
      userId: userId,
      organizationId: organizationId,
    },
  })
}
