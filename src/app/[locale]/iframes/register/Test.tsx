import { useUtmParams } from "@/helpers/getUtmParameters"
import { getCurrentSiteInfo } from "@/i18n/routing"
import { getMarketingId } from "@/services/TriveApiServices/Marketing"
import React, { use, useEffect, useState } from 'react'

export const TestPage = async () => {

    useEffect(() => {
        // TODO Does not work
        // const marketingId = await getMarketingId()

    }, [])


    return (
        <div>TestPages</div>
    )
}

