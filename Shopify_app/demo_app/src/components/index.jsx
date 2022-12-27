import { Page, Card } from '@shopify/polaris';
import { PlusMinor } from '@shopify/polaris-icons';
import { ResourcePicker } from '@shopify/app-bridge-react';

import React from 'react';
class PageExample extends React.Component {
    state = { open: false }
    render() {
        return (
            < Page
                title='Product selector'
                primaryAction={{
                    content: 'Select products',
                    onAction: () => this.setState({ open: true })
                }
                }
            >
                <ResourcePicker
                    resourceType='Product'
                    open={this.state.open}
                    onCancel={() => this.setState({ open: false })}
                    onSelection={(resources) => this.handleSelection(resources)}

                />
            </Page >
        )

    }
    handleSelection = (resources) => {
        const idFromResources = resources.selection.map((product) => product.id);
        this.setState({ open: false })
        console.log(idFromResources)
    }
}

export default PageExample;